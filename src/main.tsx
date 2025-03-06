import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { applyErrorPatches } from './lib/errorHandling';

// Appliquer les patches pour éviter les erreurs courantes
applyErrorPatches();

// Créer un élément racine et rendre l'application
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}