import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties">;

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/properties">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  const images = property.images || [];
  // Check if property has video - could be in images array or separate video field
  const hasVideo = property.images?.some(image => 
    image.includes('.mp4') || image.includes('.mov') || image.includes('.avi') || image.includes('video')
  ) || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/properties">
            <Button variant="outline" size="lg" className="hover-scale">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Properties
            </Button>
          </Link>
          <Badge 
            variant={property.status === 'sold' ? 'destructive' : 'secondary'} 
            className="text-lg px-4 py-2"
          >
            {property.status.toUpperCase()}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <RevealAnimation animation="fade-up">
              <Card className="overflow-hidden luxury-card cursor-pointer group">
                <div
                  className="relative h-[500px]"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  {images.length > 0 ? (
                    images[selectedImageIndex]?.includes('.mp4') || images[selectedImageIndex]?.includes('.mov') || images[selectedImageIndex]?.includes('.avi') ? (
                      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-center p-8 group-hover:bg-muted/80 transition-colors">
                        <PlayCircle className="w-16 h-16 text-primary mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-semibold mb-2">Click to View Video</h3>
                        <p className="text-muted-foreground">
                          Property tour video available in gallery
                        </p>
                      </div>
                    ) : (
                      <div className="relative overflow-hidden h-full">
                        <img
                          src={images[selectedImageIndex]}
                          alt={property.title}
                          className="property-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                            Click to open gallery
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No image available</span>
                    </div>
                  )}
                </div>
              </Card>
            </RevealAnimation>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <RevealAnimation animation="fade-up" delay={200}>
                <div className="grid grid-cols-5 gap-2">
                  {images.slice(0, Math.min(images.length, 10)).map((image, index) => {
                    const isVideo = image.includes('.mp4') || image.includes('.mov') || image.includes('.avi');
                    return (
                      <Card
                        key={index}
                        className={`overflow-hidden cursor-pointer transition-all duration-300 hover-scale group ${
                          selectedImageIndex === index
                            ? "ring-2 ring-primary"
                            : "hover:ring-1 hover:ring-primary/50"
                        }`}
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setIsGalleryOpen(true);
                        }}
                      >
                        {!isVideo ? (
                          <img
                            src={image}
                            alt={`${property.title} ${index + 1}`}
                            className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-20 bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                            <PlayCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </RevealAnimation>
            )}

            {/* Video Section - Show all videos available */}
            {images.some(image => image?.includes('.mp4') || image?.includes('.mov') || image?.includes('.avi')) && (
              <Card className="overflow-hidden luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Property Video Tours</h3>
                  <div className="space-y-4">
                    {images.filter(image => image?.includes('.mp4') || image?.includes('.mov') || image?.includes('.avi')).map((videoUrl, index) => (
                      <div key={index} className="relative h-96 bg-muted rounded-lg overflow-hidden">
                        <video 
                          className="w-full h-full object-cover" 
                          controls
                          preload="metadata"
                          playsInline
                        >
                          <source 
                            src={videoUrl} 
                            type="video/mp4" 
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <RevealAnimation animation="slide-right">
              <Card className="luxury-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {property.location}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-primary">
                    ₦{property.price.toLocaleString()}
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                    {property.bedrooms && (
                      <div className="flex items-center space-x-2">
                        <Bed className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.bedrooms} Beds</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center space-x-2">
                        <Bath className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.bathrooms} Baths</span>
                      </div>
                    )}
                    {property.square_feet && (
                      <div className="flex items-center space-x-2">
                        <Square className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.square_feet} sqft</span>
                      </div>
                    )}
                    {property.year_built && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">Built {property.year_built}</span>
                      </div>
                    )}
                  </div>

                  {/* Property Type */}
                  {property.property_type && (
                    <div>
                      <Badge variant="outline" className="text-sm">
                        {property.property_type}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </RevealAnimation>

            {/* Description */}
            {property.description && (
              <RevealAnimation animation="slide-right" delay={200}>
                <Card className="luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
              </RevealAnimation>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card className="luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Features</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <Card className="luxury-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Amenities</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            <Card className="luxury-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Interested?</h3>
                <div className="space-y-3">
                  <Link to="/contact">
                    <Button className="w-full" size="lg">
                      Contact Agent
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full" size="lg">
                    Schedule Viewing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};

export default PropertyDetail;