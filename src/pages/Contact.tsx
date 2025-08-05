import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+234",
    subject: "",
    message: "",
    propertyType: "",
    budget: ""
  });

  const countryCodes = [
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : ''
        }
      });

      if (error) {
        throw error;
      }
      alert("Thank you for your inquiry! We will contact you within 24 hours.");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        countryCode: "+234",
        subject: "",
        message: "",
        propertyType: "",
        budget: ""
      });
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert("Sorry, there was an error sending your message. Please try again or contact us directly.");
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "123 Victoria Island Way",
        "Lagos Island, Lagos State",
        "Nigeria"
      ]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+234 900 123 4567",
        "+234 800 456 7890",
        "WhatsApp: +234 900 123 4567"
      ]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "mansaluxerealty@mrdgngroup.com",
        "support.mansaluxerealty@mrdgngroup.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 4:00 PM",
        "Sunday: Appointments Only"
      ]
    }
  ];

  const offices = [
    {
      city: "Lagos",
      address: "123 Victoria Island Way, Lagos",
      phone: "+234 900 123 4567",
      email: "mansaluxerealty@mrdgngroup.com"
    },
    {
      city: "Abuja",
      address: "456 Central Business District, Abuja",
      phone: "+234 900 234 5678",
      email: "mansaluxerealty@mrdgngroup.com"
    },
    {
      city: "Port Harcourt",
      address: "789 GRA Phase 2, Port Harcourt",
      phone: "+234 900 345 6789",
      email: "mansaluxerealty@mrdgngroup.com"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Contact <span className="text-gold-gradient">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our luxury real estate experts. We're here to help you find your perfect property.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="luxury-card p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-2 bg-background border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary border-r-0"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="villa">Villa</option>
                    <option value="mansion">Mansion</option>
                    <option value="duplex">Duplex</option>
                    <option value="estate">Estate</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-200m">Under ₦200M</option>
                      <option value="200m-500m">₦200M - ₦500M</option>
                      <option value="500m-1b">₦500M - ₦1B</option>
                      <option value="1b-2b">₦1B - ₦2B</option>
                      <option value="over-2b">Over ₦2B</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Subject of your inquiry"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-vertical"
                    placeholder="Tell us about your requirements, preferred locations, or any specific questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury w-full inline-flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="luxury-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-semibold mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Find <span className="text-gold-gradient">Our Offices</span>
          </h2>
          
          {/* TODO: Replace with actual Google Maps integration */}
          <div className="luxury-card p-8 text-center">
            <div className="bg-muted rounded-lg h-96 flex items-center justify-center mb-8">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive map showing our office locations will be displayed here.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  TODO: Integrate Google Maps or similar mapping service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Office <span className="text-gold-gradient">Locations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Visit us at any of our convenient locations across Nigeria's major cities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="luxury-card p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{office.city}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start justify-center space-x-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{office.address}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <p>{office.phone}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <p>{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Need Immediate Assistance?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              For urgent property matters or after-hours support, our dedicated team is available 24/7 
              to assist our VIP clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+2349001234567" 
                className="btn-luxury inline-flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Emergency Line</span>
              </a>
              <a 
                href="https://wa.me/2349001234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline-luxury inline-flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;