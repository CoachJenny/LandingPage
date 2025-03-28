import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Linkedin, Mail, Heart } from 'lucide-react';
import { LegalNotice } from './LegalNotice';

export const Footer: React.FC = () => {
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);

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
                href="https://www.linkedin.com/in/jennifer-perrault-coach" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:jennifer.perrault@nahara-coaching.com" 
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
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:jennifer.perrault@nahara-coaching.com"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  jennifer.perrault@nahara-coaching.com
                </a>
              </li>
              <li className="text-white/70">06 48 14 49 45</li>
              <li className="text-white/70">Paris, France</li>
            </ul>
          </div>

          {/* Documents légaux */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Documents légaux</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsLegalNoticeOpen(true)}
                  className="text-white/70 hover:text-accent transition-colors text-left"
                >
                  Mentions légales
                </button>
              </li>
              <li>
                <Link 
                  to="/politique-de-confidentialite"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <a 
                  href="/cgv.pdf.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  CGV
                </a>
              </li>
              <li>
                <a 
                  href="/charte-ethique-aicc.pdf.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Charte éthique et déontologique de l'AICC
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center">
          <div className="text-white/40 text-xs flex items-center justify-center">
            <span>Fait avec</span>
            <Heart className="w-3 h-3 mx-1 text-accent" />
            <span>par Jennifer Perrault</span>
          </div>
        </div>
      </div>

      <LegalNotice 
        isOpen={isLegalNoticeOpen}
        onClose={() => setIsLegalNoticeOpen(false)}
      />
    </footer>
  );
};