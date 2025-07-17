// API service for fetching data from admin panel
const API_BASE_URL = 'https://mansaluxe-realty-website.vercel.app';

export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  status: 'Available' | 'Under Contract' | 'Sold';
  featured: boolean;
  images: string[];
  amenities?: string[];
  features?: string[];
  virtualTourUrl?: string;
  videoUrl?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
  rating: number;
  property: string;
}

class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private async fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      this.cache.set(cacheKey, { data, timestamp: now });
      return data;
    } catch (error) {
      console.error(`Failed to fetch from ${url}:`, error);
      
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      
      throw error;
    }
  }

  async getPublishedProperties(): Promise<Property[]> {
    const properties = await this.fetchWithCache<Property[]>(
      `${API_BASE_URL}/data/properties.json`,
      'properties'
    );
    
    // Filter out sold and off-market properties
    return properties.filter(property => 
      property.status === 'Available' || property.status === 'Under Contract'
    );
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const properties = await this.getPublishedProperties();
    return properties.filter(property => property.featured);
  }

  async getProperty(id: number): Promise<Property | null> {
    const properties = await this.getPublishedProperties();
    return properties.find(property => property.id === id) || null;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.fetchWithCache<Testimonial[]>(
      `${API_BASE_URL}/data/testimonials.json`,
      'testimonials'
    );
  }

  async searchProperties(filters: {
    location?: string;
    type?: string;
    minBedrooms?: number;
    minBathrooms?: number;
    priceRange?: [number, number];
    featured?: boolean;
  }): Promise<Property[]> {
    const properties = await this.getPublishedProperties();
    
    return properties.filter(property => {
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      
      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
        return false;
      }
      
      if (filters.minBathrooms && property.bathrooms < filters.minBathrooms) {
        return false;
      }
      
      if (filters.featured !== undefined && property.featured !== filters.featured) {
        return false;
      }
      
      if (filters.priceRange) {
        const price = this.parsePrice(property.price);
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }
      }
      
      return true;
    });
  }

  private parsePrice(priceString: string): number {
    return parseInt(priceString.replace(/[₦,]/g, ''));
  }

  // Clear cache manually if needed
  clearCache(): void {
    this.cache.clear();
  }
}

export const apiService = new ApiService();