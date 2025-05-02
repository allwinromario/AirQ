import React, { useState, useEffect } from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  // Track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listeners
    window.addEventListener("resize", handleResize);
    
    // Initial call
    handleResize();
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine responsive classes based on screen width
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <footer className={cn(
      "py-6 md:py-8 bg-transparent relative w-full transition-all duration-300",
      isDesktop ? "px-0" : isTablet ? "px-0" : "px-0"
    )}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute rounded-full blur-3xl transition-all duration-300",
          "bottom-0 right-0 bg-blue-500/5",
          isDesktop ? "w-80 h-80 -mr-36 -mb-36" : "w-72 h-72 -mr-28 -mb-28"
        )}></div>
        <div className={cn(
          "absolute rounded-full blur-3xl transition-all duration-300",
          "top-0 left-0 bg-indigo-500/5",
          isDesktop ? "w-80 h-80 -ml-36 -mt-36" : "w-72 h-72 -ml-28 -mt-28"
        )}></div>
      </div>
      
      {/* Full-width container with no side padding */}
      <div className="w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between w-full">
          {/* Left corner - Logo and description */}
          <div className={cn(
            "transition-all duration-300 pl-4 md:pl-8 lg:pl-12",
            isMobile ? "w-full" : "max-w-xs"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn(
                "font-display font-bold tracking-tight transition-all duration-300",
                isDesktop ? "text-2xl" : "text-xl"
              )}>
                Air<span className="text-blue-400">Q</span>
              </span>
            </div>
            <p className={cn(
              "text-white/70 leading-relaxed transition-all duration-300",
              isDesktop ? "text-sm" : "text-xs"
            )}>
              Advanced AI/ML solutions for high-resolution air quality mapping and environmental monitoring.
            </p>
            <div className={cn(
              "flex transition-all duration-300",
              isDesktop ? "space-x-4 mt-5" : "space-x-3 mt-4"
            )}>
              <SocialLink icon={<Github size={isDesktop ? 18 : 16} />} href="#" />
              <SocialLink icon={<Twitter size={isDesktop ? 18 : 16} />} href="#" />
              <SocialLink icon={<Linkedin size={isDesktop ? 18 : 16} />} href="#" />
              <SocialLink icon={<Mail size={isDesktop ? 18 : 16} />} href="#" />
            </div>
          </div>

          {/* Right corner - Resources and Company */}
          <div className={cn(
            "flex transition-all duration-300 pr-4 md:pr-8 lg:pr-12",
            isDesktop ? "gap-24" : isTablet ? "gap-16" : "gap-12"
          )}>
            <div>
              <h3 className={cn(
                "font-medium uppercase tracking-wider text-white/90 transition-all duration-300",
                isDesktop ? "text-sm mb-4" : "text-xs mb-3"
              )}>
                Resources
              </h3>
              <ul className={cn(
                "transition-all duration-300",
                isDesktop ? "space-y-3" : "space-y-2"
              )}>
                <FooterLink href="#">Documentation</FooterLink>
                <FooterLink href="#">API Reference</FooterLink>
                <FooterLink href="#">Research Papers</FooterLink>
                <FooterLink href="#">Case Studies</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className={cn(
                "font-medium uppercase tracking-wider text-white/90 transition-all duration-300",
                isDesktop ? "text-sm mb-4" : "text-xs mb-3"
              )}>
                Company
              </h3>
              <ul className={cn(
                "transition-all duration-300",
                isDesktop ? "space-y-3" : "space-y-2"
              )}>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Research Team</FooterLink>
                <FooterLink href="#">Partners</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className={cn(
          "border-t border-white/10 flex flex-col md:flex-row justify-between items-center w-full transition-all duration-300 px-4 md:px-8 lg:px-12",
          isDesktop ? "mt-8 pt-6" : "mt-6 pt-4"
        )}>
          <p className="text-white/60 text-xs">
            © {new Date().getFullYear()} AirQ. All rights reserved.
          </p>
          <div className={cn(
            "flex mt-3 md:mt-0 transition-all duration-300",
            isDesktop ? "space-x-6" : "space-x-4"
          )}>
            <FooterLink href="#" small>Privacy Policy</FooterLink>
            <FooterLink href="#" small>Terms of Service</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors hover:scale-105 duration-200"
      style={{
        width: 'calc(2rem - 4px)',
        height: 'calc(2rem - 4px)'
      }}
    >
      {icon}
    </a>
  );
};

const FooterLink = ({ href, small, children }) => {
  return (
    <li>
      <a
        href={href}
        className={`text-white/60 hover:text-white transition-colors ${small ? 'text-xs' : 'text-xs md:text-sm'}`}
      >
        {children}
      </a>
    </li>
  );
};

export default Footer;
