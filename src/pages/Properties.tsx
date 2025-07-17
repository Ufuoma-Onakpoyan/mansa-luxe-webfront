import { useState, useEffect } from "react";
import { MapPin, Bed, Bath, Square, Filter, Search } from "lucide-react";
import propertiesData from "../data/properties.json";

interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  image: string;
  featured: boolean;
  type: string;
}

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  useEffect(() => {
    // TODO: Replace with API call to fetch properties
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by property type
    if (filterType !== "all") {
      filtered = filtered.filter(property => property.type === filterType);
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter(property => property.featured);
    }

    setFilteredProperties(filtered);
  }, [properties, searchTerm, filterType, showFeaturedOnly]);

  const propertyTypes = ["all", "penthouse", "villa", "mansion", "estate", "apartment", "duplex"];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Luxury <span className="text-gold-gradient">Properties</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover Nigeria's most prestigious residential and commercial properties.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties or locations..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  className="bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                />
                <span className="text-sm text-muted-foreground">Featured Only</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredProperties.length} of {properties.length} properties
            </p>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="luxury-card overflow-hidden">
                  {property.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  
                  <div className="aspect-video bg-muted relative">
                    {/* TODO: Replace with actual property images */}
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto mb-2">
                          <Square className="w-8 h-8" />
                        </div>
                        <p className="text-sm">Property Image</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2">{property.name}</h3>
                    
                    <div className="flex items-center space-x-1 text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Square className="w-4 h-4" />
                        <span>{property.area}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">{property.price}</span>
                      <button className="btn-outline-luxury !px-4 !py-2 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TODO: Add pagination for large property lists */}
          {filteredProperties.length > 9 && (
            <div className="text-center mt-12">
              <button className="btn-luxury">
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Our team specializes in finding exclusive off-market properties that match your specific requirements. 
              Let us help you discover your perfect luxury home.
            </p>
            <button className="btn-luxury">
              Contact Our Property Experts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;