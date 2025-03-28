import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Storytelling } from './components/Storytelling';
import { Frustrations } from './components/Frustrations';
import { Promise } from './components/Promise';
import { Expectations } from './components/Expectations';
import { NotHere } from './components/NotHere';
import { EQi } from './components/EQi';
import { ForYou } from './components/ForYou';
import { Quiz } from './components/Quiz';
import { Offers } from './components/Offers';
import { OfferDetail } from './components/OfferDetail';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PrivacyPolicy } from './components/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/offres/:id" element={
          <>
            <OfferDetail />
            <Footer />
          </>
        } />
        <Route path="/politique-de-confidentialite" element={
          <>
            <PrivacyPolicy />
            <Footer />
          </>
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Hero />
            <Storytelling />
            <Frustrations />
            <Promise />
            <Expectations />
            <NotHere />
            <EQi />
            <ForYou />
            <Quiz />
            <Offers />
            <About />
            <Testimonials />
            <FAQ />
            <Footer />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;