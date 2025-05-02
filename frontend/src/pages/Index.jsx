import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Results from '@/components/Results';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

// Define the animation CSS in a separate object
const animationStyles = {
  '@keyframes section-flash': {
    '0%': { filter: 'brightness(1)' },
    '50%': { filter: 'brightness(1.15)' },
    '100%': { filter: 'brightness(1)' }
  },
  '.section-activated': {
    animation: 'section-flash 0.5s ease-in-out'
  }
};

// Add these styles to a stylesheet in the useEffect
const addAnimationStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes section-flash {
      0% { filter: brightness(1); }
      50% { filter: brightness(1.15); }
      100% { filter: brightness(1); }
    }
    
    .section-activated {
      animation: section-flash 0.5s ease-in-out;
    }
  `;
  document.head.appendChild(styleSheet);
  return styleSheet;
};

const Index = () => {
  const heroRef = useRef(null);
  const resultsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const mainContainerRef = useRef(null);

  // Function to scroll to top
  const scrollToTop = () => {
    console.log("Executing scrollToTop function");
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop = 0;
    }

    // Try multiple methods to ensure we get to the top
    window.scrollTo(0, 0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Focus on hero section for keyboard accessibility
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.focus();
    }

    console.log("Scroll to top executed");
  };

  // Enhanced smooth scroll functionality
  useEffect(() => {
    // Add the animation styles to the document
    const styleElement = addAnimationStyles();
    
    // Expose scrollToTop function globally
    window.scrollToTop = scrollToTop;
    
    // Function to handle anchor links
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const targetId = href.replace('#', '');
      
      // Special case for hero/home section
      if (targetId === 'hero') {
        scrollToTop();
        return;
      }
      
      // Find the section element by id
      const target = document.getElementById(targetId);
      
      if (target) {
        // Use scrollIntoView with behavior: 'smooth'
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
    
    // Add event listeners to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Add specific listeners for home navigation
    const addHomeNavListeners = () => {
      // Find all home navigation elements
      const homeNavElements = document.querySelectorAll('[data-nav="home"], [data-section="hero"]');
      homeNavElements.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          console.log("Home nav element clicked");
          scrollToTop();
        });
      });

      // Add listener to logo click
      const logoElements = document.querySelectorAll('.logo, .brand-logo');
      logoElements.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          console.log("Logo element clicked");
          scrollToTop();
        });
      });
    };

    // Add home nav listeners after a short delay
    setTimeout(addHomeNavListeners, 500);

    // Special handling for direct navigation through URL hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      
      if (id === 'hero') {
        scrollToTop();
      } else {
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    }

    // Clean up event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      delete window.scrollToTop;
      // Remove the style element when component unmounts
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-space-dark text-white h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar scrollToTop={scrollToTop} />
      </div>
      
      {/* Full-screen sections */}
      <div ref={mainContainerRef} className="flex-1 overflow-y-auto snap-y snap-mandatory">
        <section className="snap-start min-h-screen" id="hero" ref={heroRef} tabIndex="-1">
          <Hero />
        </section>
        
        <section className="snap-start min-h-screen" id="results" ref={resultsRef}>
          <Results />
        </section>
        
        <section className="snap-start min-h-screen" id="about" ref={aboutRef}>
          <About />
        </section>
        
        {/* Combined Contact and Footer section */}
        <section className="snap-start min-h-screen" id="contact" ref={contactRef}>
          <div className="h-screen flex flex-col">
            <div className="flex-1">
              <CTA />
            </div>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
