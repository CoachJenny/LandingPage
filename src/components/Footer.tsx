import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo et description */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display text-white mb-4 inline-block">
              Jennifer Perrault
            </Link>
            <p className="text-white/70 mb-6">
              Coaching narratif et intelligence émotionnelle pour transformer vos blocages en leviers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@jenniferperrault.com" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <HashLink 
                  to="/#offers" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Offres de coaching
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#quiz" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Quiz d'orientation
                </HashLink>
              </li>
              <li>
                <HashLink 
                  to="/#faq" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  FAQ
                </HashLink>
              </li>
              <li>
                <a 
                  href="https://calendly.com/jennifer-perrault/call-decouverte" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Réserver un appel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-accent-light flex-shrink-0 mt-0.5" />
                <span className="text-white/70">+33 6 XX XX XX XX</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-accent-light flex-shrink-0 mt-0.5" />
                <a 
                  href="mailto:contact@jenniferperrault.com" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  contact@jenniferperrault.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent-light flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Paris, France</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Recevez mes conseils et actualités directement dans votre boîte mail.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-accent hover:bg-accent-light text-white rounded-lg transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Jennifer Perrault. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm">Mentions légales</a>
            <a href="#" className="text-white/60 hover:text-white text-sm">Politique de confidentialité</a>
            <a href="#" className="text-white/60 hover:text-white text-sm">CGV</a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-white/40 text-xs flex items-center justify-center">
          <span>Fait avec</span>
          <Heart className="w-3 h-3 mx-1 text-accent" />
          <span>par Jennifer Perrault</span>
        </div>
      </div>
    </footer>
  );
};