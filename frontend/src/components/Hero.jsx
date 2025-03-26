
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const starsContainerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!starsContainerRef.current) return;

    const container = starsContainerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create stars dynamically
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2;

      star.className = 'absolute rounded-full bg-white opacity-70';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * width}px`;
      star.style.top = `${Math.random() * height}px`;
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
      star.style.animationDelay = `${Math.random() * 2}s`;

      container.appendChild(star);
    }

    // Mark as loaded to trigger animations
    setTimeout(() => setLoaded(true), 100);

    // Handle scroll animation
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Create city lights dynamically
  const createCityLights = () => {
    const lights = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 1.5;
      const left = 40 + Math.random() * 40; // Concentrate on the bottom right
      const top = 65 + Math.random() * 30;
      const opacity = Math.random() * 0.7 + 0.3;
      const delay = Math.random() * 5;

      lights.push(
        <div
          key={i}
          className="absolute rounded-full bg-yellow-300"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity: opacity,
            animation: `cityTwinkle 3s ease-in-out infinite`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return lights;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Stars container */}
      <div ref={starsContainerRef} className="absolute inset-0 z-0" />

      {/* Earth background with parallax effect */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        {/* Large earth curve */}
        <div className="absolute w-[150%] h-[150%] rounded-full bg-gray-900 left-[50%] top-[80%] translate-x-[-50%] translate-y-[-35%]">
          {/* Blue atmospheric glow */}
          <div className="absolute inset-0 rounded-full border-[30px] border-blue-500/20 blur-md"></div>
          <div className="absolute inset-0 rounded-full border-[15px] border-blue-400/30 blur-sm"></div>
          <div className="absolute inset-0 rounded-full border-[5px] border-blue-300/40"></div>

          {/* City lights */}
          {createCityLights()}
        </div>
      </div>

      {/* Hero gradient overlay - ensures text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/40 to-gray-950/80 z-10" />

      {/* Animated Logo */}
      <div
        className={`absolute top-8 left-8 z-30 transition-all duration-700 ${loaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
          }`}
        style={{
          transform: `translateY(${scrollY * -0.05}px)`
        }}
      >
        <div className="text-white text-2xl font-bold flex items-center">
          <span className="relative">
            Air
            <span className="text-blue-400 font-bold">Q</span>
            {/* Shiny effects */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/0 via-blue-400/70 to-blue-400/0 opacity-50 blur-sm animate-shine"></div>
            <div className="absolute -right-2 -top-2 w-4 h-4 bg-blue-400 rounded-full opacity-70 blur-sm animate-pulse"></div>
          </span>
        </div>
      </div>

      <div
        className="container px-4 pt-20 pb-32 relative z-20"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`font-sans text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-all duration-700 delay-200 ${loaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
              }`}
          >
            Fine Spatial Resolution
            <span className="text-blue-400"> Air Quality Mapping</span>
          </h1>

          <p
            className={`text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${loaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
              }`}
          >
            Downscaling satellite-based air quality maps for real-time monitoring, unmatched accuracy, and deeper insights into environmental conditions.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${loaded ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
              }`}
          >
            <a href="https://waqi.info/#/c/4.333/7.871/2.3z">
              <button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                Explore
                <ArrowRight size={18} />
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Floating PM2.5 Levels indicator */}
      <div
        className={`absolute left-10 bottom-1/3 hidden md:block transition-all duration-1000 delay-800 ${loaded ? "opacity-100 animate-floating" : "opacity-0"
          }`}
        style={{
          transform: `translateY(${scrollY * -0.03}px)`
        }}
      >
        <div className="backdrop-blur-md bg-white/10 px-3 py-2 rounded-lg border border-white/10">
          <span className="text-xs text-white">PM2.5 Levels</span>
          <div className="w-20 h-1 bg-white/20 rounded-full mt-1">
            <div className="w-3/4 h-full bg-teal-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating AQI Index indicator */}
      <div
        className={`absolute right-10 bottom-1/2 hidden md:block transition-all duration-1000 delay-1000 ${loaded ? "opacity-100 animate-floating-delayed" : "opacity-0"
          }`}
        style={{
          transform: `translateY(${scrollY * -0.08}px)`
        }}
      >
        <div className="backdrop-blur-md bg-white/10 px-3 py-2 rounded-lg border border-white/10">
          <span className="text-xs text-white">AQI Index</span>
          <div className="w-20 h-1 bg-white/20 rounded-full mt-1">
            <div className="w-1/2 h-full bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* NO2 Levels indicator */}
      <div
        className={`absolute right-28 bottom-10 hidden md:block transition-all duration-1000 delay-1000 ${loaded ? "opacity-100 animate-floating-delayed" : "opacity-0"
          }`}
        style={{
          transform: `translateY(${scrollY * -0.08}px)`
        }}
      >
        <div className="backdrop-blur-md bg-white/10 px-3 py-2 rounded-lg border border-white/10">
          <span className="text-xs text-white">NO2 Levels</span>
          <div className="w-20 h-1 bg-white/20 rounded-full mt-1">
            <div className="w-1/2 h-full bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes cityTwinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shine {
          0%, 100% { left: -100%; }
          50%, 50.1% { left: 100%; }
        }
        
        .animate-floating {
          animation: floating 4s ease-in-out infinite;
        }
        
        .animate-floating-delayed {
          animation: floating 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-shine {
          animation: shine 4s linear infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Hero;
