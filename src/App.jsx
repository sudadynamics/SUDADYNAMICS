import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ContactPopup from './components/ContactPopup';
import { translations } from './utils/translations';
import './App.css';

function App() {
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('dark'); // Default to dark mode for premium colors glow
  const [contactOpen, setContactOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  // Handle setting/changing the theme attribute in the HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Translation copy selection
  const t = translations[lang];

  const handleOpenContact = () => {
    setPreselectedService('');
    setContactOpen(true);
  };

  const handleInquireService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    setContactOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* Background Animated Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Navbar 
        t={t} 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        setTheme={setTheme} 
        onContactClick={handleOpenContact}
      />

      <main>
        <Hero 
          t={t} 
          onContactClick={handleOpenContact} 
        />
        
        <Services 
          t={t} 
          onInquireService={handleInquireService} 
        />
        
        <Team 
          t={t} 
        />
      </main>

      <Footer 
        t={t} 
        onContactClick={handleOpenContact} 
      />

      <FloatingContact 
        t={t} 
        onOpenForm={handleOpenContact} 
      />

      <ContactPopup 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
        t={t} 
        preselectedService={preselectedService}
      />
    </div>
  );
}

export default App;
