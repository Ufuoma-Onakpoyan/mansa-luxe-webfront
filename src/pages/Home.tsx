import { ArrowRight, Award, Users, Home as HomeIcon, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-mansion.jpg";

const Home = () => {
  const stats = [
    { icon: HomeIcon, value: "500+", label: "Luxury Properties Sold" },
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Award, value: "15+", label: "Awards Won" },
    { icon: TrendingUp, value: "₦50B+", label: "Total Sales Value" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section relative">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Luxury Nigerian Mansion" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            Luxury Living
            <span className="block text-gold-gradient">Redefined</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Discover Nigeria's most prestigious properties with MansaLuxeRealty. 
            Where exceptional service meets unparalleled luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/properties" 
              className="btn-luxury inline-flex items-center justify-center space-x-2"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/about" 
              className="btn-outline-luxury inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Featured <span className="text-gold-gradient">Properties</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked selection of our most prestigious properties across Nigeria's premier locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TODO: Replace with dynamic data from properties.json */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="luxury-card overflow-hidden">
                <div className="aspect-video bg-muted">
                  {/* TODO: Replace with actual property images */}
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Property Image {item}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">Property Name</h3>
                  <p className="text-muted-foreground mb-4">Location, Lagos</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">₦XXX,XXX,XXX</span>
                    <Link 
                      to="/properties" 
                      className="text-primary hover:text-primary/80 font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/properties" className="btn-luxury">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Why Choose <span className="text-gold-gradient">MansaLuxeRealty</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the difference with Nigeria's leading luxury real estate company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Premium Quality</h3>
              <p className="text-muted-foreground">
                Every property in our portfolio meets the highest standards of luxury and excellence.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Expert Service</h3>
              <p className="text-muted-foreground">
                Our experienced team provides personalized service throughout your property journey.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Market Leadership</h3>
              <p className="text-muted-foreground">
                Proven track record with Nigeria's largest portfolio of luxury properties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;