import React from 'react';
import { X } from 'lucide-react';

interface LegalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white text-primary rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-display mb-8">Mentions légales</h2>

        <div className="prose prose-lg max-w-none">
          <section>
            <h3 className="text-xl font-semibold mb-4">1. Éditeur du site</h3>
            <p>
              Le présent site est édité par Nahara Consulting, SASU immatriculée au Registre du Commerce 
              et des Sociétés de Créteil sous le numéro SIRET 984 168 047 00012, ayant pour code APE 
              7022Z (Conseil pour les affaires et autres conseils de gestion) et dont le siège social 
              est situé au 25 rue André Bollier, 94100 Saint-Maur-des-Fossés, France.
            </p>
            <p>
              Contact : jennifer.perrault@nahara-coaching.com<br />
              Téléphone : 06 48 14 49 45<br />
              Numéro de TVA intracommunautaire : FR14984168047
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">2. Hébergement du site</h3>
            <p>
              Le site est actuellement en cours d'hébergement. Cette section sera mise à jour dès la 
              finalisation du choix de l'hébergeur.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">3. Directeur de la publication</h3>
            <p>
              Le directeur de la publication est Jennifer Perrault, en sa qualité de présidente de 
              Nahara Consulting.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">4. Activité et propriété intellectuelle</h3>
            <p>
              Le site nahara-coaching.com présente les services de coaching professionnel proposés 
              par Nahara Consulting.
            </p>
            <p>
              L'ensemble des éléments présents sur ce site (textes, images, vidéos, logos, graphismes, 
              etc.) sont la propriété exclusive de Nahara Consulting, sauf mention contraire. Toute 
              reproduction, représentation, modification, publication, transmission ou adaptation, 
              totale ou partielle, des éléments du site, sans autorisation préalable et écrite, est 
              interdite et constitue une contrefaçon sanctionnée par le Code de la Propriété 
              Intellectuelle.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">5. Protection des données personnelles et cookies</h3>
            <p>
              Dans le cadre de son activité, Nahara Consulting est amenée à collecter et traiter 
              certaines données personnelles des visiteurs (formulaires de contact, newsletters, etc.). 
              Ces traitements sont effectués conformément au Règlement Général sur la Protection des 
              Données (RGPD - UE 2016/679).
            </p>
            <p>
              Les visiteurs disposent d'un droit d'accès, de rectification, d'opposition et de 
              suppression de leurs données personnelles. Pour exercer ces droits, il suffit d'envoyer 
              une demande à jennifer.perrault@nahara-coaching.com.
            </p>
            <p>
              Le site peut également utiliser des cookies afin d'améliorer l'expérience utilisateur. 
              Un bandeau d'information permet aux visiteurs d'accepter ou de paramétrer l'utilisation 
              de ces cookies.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">6. Confidentialité des séances de coaching</h3>
            <p>
              Les informations partagées par les clients dans le cadre des séances de coaching sont 
              strictement confidentielles et ne seront en aucun cas divulguées sans consentement 
              préalable, sauf obligation légale.
            </p>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-4">7. Responsabilité</h3>
            <p>
              L'éditeur du site met tout en œuvre pour assurer la fiabilité des informations publiées, 
              mais ne peut garantir l'absence d'erreurs ou d'omissions. L'utilisateur est seul 
              responsable de l'usage qu'il fait des informations mises à disposition sur le site.
            </p>
            <p>
              En cas de litige, les tribunaux compétents seront ceux du ressort du Tribunal de 
              Commerce de Créteil.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};