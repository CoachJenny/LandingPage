import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Calendar } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <img 
              src="/LogoNahara.png" 
              alt="Nahara Coaching" 
              className="h-6 md:h-8 w-auto"
            />
            <span className="text-base md:text-xl font-display text-white">Jennifer Perrault</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <HashLink 
              to="/#offers" 
              className="text-white/80 hover:text-white transition-colors"
            >
              Offres
            </HashLink>
            <HashLink 
              to="/#quiz" 
              className="text-white/80 hover:text-white transition-colors"
            >
              Quiz
            </HashLink>
            <HashLink 
              to="/#faq" 
              className="text-white/80 hover:text-white transition-colors"
            >
              FAQ
            </HashLink>
            <a
              href="https://calendly.com/jennifer-perrault/call-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center px-4 py-2 bg-accent hover:bg-accent-light 
                text-white rounded-full transition-all transform hover:scale-105"
            >
              <Calendar className="w-4 h-4 mr-2" />
              <span>Réserve ton coaching gratuit</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="touch-target md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <HashLink 
                to="/#offers" 
                className="touch-target text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Offres
              </HashLink>
              <HashLink 
                to="/#quiz" 
                className="touch-target text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </HashLink>
              <HashLink 
                to="/#faq" 
                className="touch-target text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </HashLink>
              <a
                href="https://calendly.com/jennifer-perrault/call-decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center px-4 py-3 bg-accent hover:bg-accent-light 
                  text-white rounded-full transition-all w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Réserve ton coaching gratuit</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};