import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import testimonial1 from "../assets/testimonial-1.jpg";
import testimonial2 from "../assets/testimonial-2.jpg";
import testimonial3 from "../assets/testimonial-3.jpg";
import testimonial4 from "../assets/testimonial-4.jpg";
import testimonial5 from "../assets/testimonial-5.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Chioma Okafor",
      position: "Medical Director, Lagos University Teaching Hospital",
      image: testimonial1,
      rating: 5,
      quote: "MansaLuxeRealty helped us find our dream home in Victoria Island. Their professionalism and attention to detail throughout the entire process was exceptional. They truly understand the luxury market in Lagos.",
      location: "Victoria Island Property Purchase",
      date: "December 2023"
    },
    {
      id: 2,
      name: "Alhaji Musa Ibrahim",
      position: "CEO, Northern Star Holdings",
      image: testimonial2,
      rating: 5,
      quote: "Working with MansaLuxeRealty was a game-changer for our corporate housing needs. They provided exceptional service and found us the perfect executive apartments for our Abuja operations.",
      location: "Abuja Corporate Housing",
      date: "November 2023"
    },
    {
      id: 3,
      name: "Mrs. Adunni Adeleke",
      position: "International Business Consultant",
      image: testimonial3,
      rating: 5,
      quote: "The team at MansaLuxeRealty made selling our Ikoyi property seamless. They achieved a price above our expectations and handled all the complex documentation with expertise.",
      location: "Ikoyi Property Sale",
      date: "October 2023"
    },
    {
      id: 4,
      name: "Engineer Kemi Balogun",
      position: "Managing Director, Balogun Construction",
      image: testimonial4,
      rating: 5,
      quote: "Their property management services have been outstanding. Our investment properties are well-maintained, and we receive detailed monthly reports. Highly recommended for serious investors.",
      location: "Property Management Client",
      date: "September 2023"
    },
    {
      id: 5,
      name: "Mr. Emeka Nwankwo",
      position: "Tech Entrepreneur",
      image: testimonial5,
      rating: 5,
      quote: "MansaLuxeRealty's investment advisory helped us build a diverse real estate portfolio across Lagos and Abuja. Their market insights and strategic guidance have been invaluable.",
      location: "Investment Portfolio Development",
      date: "August 2023"
    }
    // TODO: Add more testimonials from real clients
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const stats = [
    { value: "98%", label: "Client Satisfaction Rate" },
    { value: "500+", label: "Successful Transactions" },
    { value: "₦50B+", label: "Total Property Value Sold" },
    { value: "15+", label: "Industry Awards" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Client <span className="text-gold-gradient">Testimonials</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Hear from our satisfied clients about their luxury real estate experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Testimonial Carousel */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="luxury-card p-8 md:p-12 relative">
              <Quote className="w-16 h-16 text-primary/20 absolute top-8 left-8" />
              
              <div className="text-center relative z-10">
                <div className="mb-8">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover transition-opacity duration-500"
                  />
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium mb-8 text-foreground leading-relaxed animate-fade-in">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="text-center">
                  <h4 className="text-lg font-serif font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary font-medium mb-2">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                  </p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-primary-foreground" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              What Our <span className="text-gold-gradient">Clients Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Read more reviews from our satisfied clients across Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="luxury-card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium">{testimonial.location}</p>
                  <p>{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* TODO: Add load more functionality for additional testimonials */}
          <div className="text-center mt-12">
            <button className="btn-outline-luxury">
              Load More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Experience the same exceptional service that has made our clients' real estate 
              dreams come true. Let us help you find your perfect luxury property.
            </p>
            <button className="btn-luxury">
              Start Your Property Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;