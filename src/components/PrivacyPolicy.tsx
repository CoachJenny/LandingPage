import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light py-20">
      <div className="container mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-white/90">
          <h1 className="text-3xl font-display text-white mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-lg prose-invert">
            <p>
              La présente politique de confidentialité a pour objectif de vous informer, en toute transparence, 
              sur la manière dont vos données personnelles sont collectées, utilisées et protégées lorsque vous utilisez ce site.
            </p>

            <h2>1. Qui est responsable du traitement de vos données ?</h2>
            <p>
              Le responsable du traitement est :<br />
              Nahara Consulting<br />
              25 rue André Bollier 94100 Saint-Maur-Des-Fossés<br />
              Email : jennifer.perrault@nahara-coaching.com
            </p>

            <h2>2. Quelles données sont collectées ?</h2>
            <p>Nous collectons uniquement les données strictement nécessaires, notamment :</p>
            <ul>
              <li>votre adresse e-mail</li>
              <li>votre nom et prénom (le cas échéant)</li>
              <li>tout autre contenu librement fourni dans un champ de message (dans un formulaire de contact, par exemple)</li>
            </ul>
            <p>Ces données sont collectées uniquement lorsque vous les renseignez volontairement via un formulaire.</p>

            <h2>3. À quelles fins vos données sont-elles utilisées ?</h2>
            <p>Les données collectées le sont dans les buts suivants :</p>
            <ul>
              <li>vous envoyer une réponse à votre message (dans le cadre d'un formulaire de contact)</li>
              <li>vous transmettre des informations ou ressources (ex. newsletter, document téléchargeable)</li>
              <li>assurer le bon fonctionnement du site et mesurer son audience (via des outils statistiques anonymes)</li>
            </ul>

            <h2>4. Quelle est la base légale du traitement ?</h2>
            <p>
              La collecte repose sur votre consentement explicite, que vous pouvez retirer à tout moment.<br />
              Une case à cocher vous permet de donner ce consentement de manière claire, libre et éclairée.
            </p>

            <h2>5. Combien de temps vos données sont-elles conservées ?</h2>
            <p>Vos données sont conservées :</p>
            <ul>
              <li>pour une durée maximale de 3 ans à compter de votre dernier contact ou de votre dernière interaction (sauf obligation légale contraire)</li>
              <li>ou jusqu'à votre demande de suppression</li>
            </ul>

            <h2>6. Qui a accès à vos données ?</h2>
            <p>Vos données sont accessibles uniquement :</p>
            <ul>
              <li>au responsable du site et à son équipe (si applicable)</li>
              <li>aux prestataires techniques strictement nécessaires à l'hébergement et à la maintenance du site, dans la limite de leurs missions</li>
            </ul>
            <p>Vos données ne sont ni vendues, ni louées, ni transmises à des tiers à des fins commerciales.</p>

            <h2>7. Quels sont vos droits ?</h2>
            <p>Conformément au RGPD, vous disposez à tout moment des droits suivants :</p>
            <ul>
              <li>Accès à vos données</li>
              <li>Rectification de vos données</li>
              <li>Suppression ou droit à l'oubli</li>
              <li>Limitation ou opposition au traitement</li>
              <li>Portabilité des données, si applicable</li>
            </ul>
            <p>
              Pour exercer ces droits, envoyez un e-mail à : 
              <a href="mailto:jennifer.perrault@nahara-coaching.com" className="text-accent-light hover:underline ml-1">
                jennifer.perrault@nahara-coaching.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};