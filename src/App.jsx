import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ContactPopup from './components/ContactPopup';
import CostCalculator from './components/CostCalculator';
import Workflow from './components/Workflow';
import { translations } from './utils/translations';
import './App.css';

function App() {
  const [lang, setLang] = useState('tr');
  const [theme, setTheme] = useState('dark'); // Default to dark mode for premium colors glow
  const [contactOpen, setContactOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  
  // Custom Cursor Tracker State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle setting/changing the theme attribute in the HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track mouse coordinates for interactive cursor
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scaling animations on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.service-card') || 
        target.closest('.team-card') || 
        target.closest('.control-btn') ||
        target.closest('.social-btn')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

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
      {/* Custom Premium Agency Cursor Follower */}
      {!isMobile && (
        <>
          <div 
            className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          ></div>
          <div 
            className={`custom-cursor-follower ${isHovered ? 'hovered' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          ></div>
        </>
      )}

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
          onOpenCalculator={() => setCalcOpen(true)}
        />
        
        <Workflow 
          t={t} 
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

      <CostCalculator 
        isOpen={calcOpen} 
        onClose={() => setCalcOpen(false)} 
        t={t} 
        lang={lang}
      />
    </div>
  );
}

export default App;
