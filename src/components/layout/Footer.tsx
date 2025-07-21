import { Building, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-serif font-bold text-lg leading-tight">
                  MansaLuxeRealty
                </span>
                <span className="text-muted-foreground text-xs leading-tight">
                  A MrDGNGroup Company
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Nigeria's premier luxury real estate company, delivering exceptional properties and unmatched service since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/properties" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Properties
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/testimonials" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Testimonials
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Property Sales</p>
              <p className="text-muted-foreground text-sm">Property Management</p>
              <p className="text-muted-foreground text-sm">Investment Advisory</p>
              <p className="text-muted-foreground text-sm">Luxury Rentals</p>
              <p className="text-muted-foreground text-sm">Property Valuation</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    123 Victoria Island Way,<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">+234 900 123 4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">info@mansaluxerealty.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-muted-foreground text-sm">
                © 2024 MansaLuxeRealty. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground text-xs">A subsidiary of</span>
                <img 
                  src="/lovable-uploads/dfadbc43-f447-4837-86f0-6d747e4e1cea.png" 
                  alt="MR DGN GROUP" 
                  className="h-5 md:h-6"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;