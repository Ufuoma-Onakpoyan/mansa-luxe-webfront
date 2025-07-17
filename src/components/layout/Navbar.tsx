import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Info, Building, Briefcase, MessageSquare, Phone } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/about", label: "About", icon: Info },
    { to: "/properties", label: "Properties", icon: Building },
    { to: "/services", label: "Services", icon: Briefcase },
    { to: "/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Building className="w-5 h-5 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-serif font-bold text-lg leading-tight">
                MansaLuxeRealty
              </span>
              <span className="text-primary/70 text-xs leading-tight">
                A MrDGNGroup Company
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-2 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-primary/80 hover:text-primary hover:bg-primary/10"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-t border-primary/20 shadow-md">
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-primary/80 hover:text-primary hover:bg-primary/10"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;