import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string; // UUID from Supabase
  title: string;
  description: string | null;
  price: number; // Numeric in Supabase
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: string | null;
  property_type: string | null;
  status: string;
  images: string[] | null;
  amenities: string[] | null;
  features: string[] | null;
  year_built: number | null;
  agent: any | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string; // UUID from Supabase
  name: string;
  role: string | null;
  company: string | null;
  photo: string | null;
  quote: string;
  rating: number | null;
  property_id: string | null;
  created_at: string;
  updated_at: string;
}

class ApiService {
  async getPublishedProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return data || [];
  }

  async getFeaturedProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching featured properties:', error);
      throw error;
    }

    // Fallback to latest 3 if no featured properties
    if (!data || data.length === 0) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false })
        .limit(3);

      if (fallbackError) {
        console.error('Error fetching fallback properties:', error);
        throw fallbackError;
      }

      return fallbackData || [];
    }

    return data || [];
  }

  async getProperty(id: string): Promise<Property | null> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }

    return data;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }

    return data || [];
  }

  async searchProperties(filters: {
    location?: string;
    property_type?: string;
    minBedrooms?: number;
    minBathrooms?: number;
    priceRange?: [number, number];
  }): Promise<Property[]> {
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available');

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.property_type) {
      query = query.eq('property_type', filters.property_type);
    }

    if (filters.minBedrooms) {
      query = query.gte('bedrooms', filters.minBedrooms);
    }

    if (filters.minBathrooms) {
      query = query.gte('bathrooms', filters.minBathrooms);
    }

    if (filters.priceRange) {
      query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error searching properties:', error);
      throw error;
    }

    return data || [];
  }

  // Helper method to format price for display
  formatPrice(price: number): string {
    return `₦${price.toLocaleString()}`;
  }
}

export const apiService = new ApiService();