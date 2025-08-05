import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Award, Star } from "lucide-react";
import { useFeaturedProperties } from "@/hooks/useProperties";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { useStaggeredReveal } from "@/hooks/useScrollReveal";
import heroMansion from "@/assets/hero-mansion.jpg";

const Home = () => {
  const { properties: featuredProperties, loading } = useFeaturedProperties();
  const { ref: statsRef, visibleItems } = useStaggeredReveal(4, 150);

  const stats = [
    { number: "500+", label: "Properties Sold", icon: TrendingUp },
    { number: "1000+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "98%", label: "Client Satisfaction", icon: Star },
  ];

  const reasons = [
    {
      title: "Premium Properties",
      description: "Curated selection of Nigeria's finest luxury properties in prime locations.",
    },
    {
      title: "Expert Guidance",
      description: "Professional real estate consultants with deep market knowledge.",
    },
    {
      title: "Seamless Process",
      description: "From viewing to closing, we ensure a smooth and transparent experience.",
    },
    {
      title: "After-Sales Support",
      description: "Continued relationship and support even after your purchase.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroMansion})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <RevealAnimation animation="fade-up" delay={200}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              Luxury Living <br />
              <span className="text-gold-gradient">Redefined</span>
            </h1>
          </RevealAnimation>
          
          <RevealAnimation animation="fade-up" delay={400}>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover Nigeria's most prestigious properties with Mansa Luxe Realty. 
              Where exceptional service meets extraordinary homes.
            </p>
          </RevealAnimation>
          
          <RevealAnimation animation="fade-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-luxury hover-scale">
                <Link to="/properties">
                  Explore Properties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-outline-luxury hover-scale">
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </RevealAnimation>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-accent rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-primary rounded-full animate-pulse opacity-80" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-card via-background to-card">
        <div className="container mx-auto px-4">
          <RevealAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Trusted by <span className="text-gold-gradient">Thousands</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our track record speaks for itself. Building relationships and delivering results.
              </p>
            </div>
          </RevealAnimation>

          <div ref={statsRef as any} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center group transition-all duration-700 ${
                    visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <Card className="luxury-card hover-lift p-8">
                    <CardContent className="p-0 text-center">
                      <Icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <div className="text-4xl font-bold text-gold-gradient mb-2">{stat.number}</div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary to-background">
        <div className="container mx-auto px-4">
          <RevealAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Featured <span className="text-gold-gradient">Properties</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked luxury properties that define sophisticated living.
              </p>
            </div>
          </RevealAnimation>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="luxury-card">
                  <div className="aspect-card bg-muted animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-muted rounded mb-3 animate-pulse" />
                    <div className="h-4 bg-muted rounded mb-4 animate-pulse" />
                    <div className="h-8 bg-muted rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 6).map((property, index) => (
                <RevealAnimation 
                  key={property.id} 
                  animation="fade-up" 
                  delay={index * 100}
                >
                  <Card className="property-card group hover-lift">
                    <div className="aspect-card overflow-hidden">
                      <img
                        src={property.images?.[0] || '/placeholder.svg'}
                        alt={property.title}
                        className="property-image w-full h-full object-contain bg-muted/20"
                      />
                      {property.featured && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold font-serif line-clamp-2 flex-1">
                          {property.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gold-gradient">
                          ₦{property.price.toLocaleString()}
                        </div>
                        <Button asChild variant="outline" size="sm" className="hover-scale">
                          <Link to={`/properties/${property.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </RevealAnimation>
              ))}
            </div>
          )}

          <RevealAnimation animation="fade-up" delay={800}>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline" className="btn-outline-luxury hover-scale">
                <Link to="/properties">
                  View All Properties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-card via-background to-card">
        <div className="container mx-auto px-4">
          <RevealAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Why Choose <span className="text-gold-gradient">Mansa Luxe</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the difference of working with Nigeria's premier luxury real estate company.
              </p>
            </div>
          </RevealAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <RevealAnimation 
                key={index} 
                animation="slide-left" 
                delay={index * 200}
              >
                <Card className="luxury-card hover-lift p-8">
                  <CardContent className="p-0">
                    <h3 className="text-2xl font-bold font-serif mb-4 text-gold-gradient">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <RevealAnimation animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Ready to Find Your <span className="text-gold-gradient">Dream Home</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let our expert team guide you through Nigeria's finest luxury properties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-luxury hover-scale">
                  <Link to="/contact">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-outline-luxury hover-scale">
                  <Link to="/properties">
                    Browse Properties
                  </Link>
                </Button>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>
    </div>
  );
};

export default Home;