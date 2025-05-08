import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { authService } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";

const Navbar = ({ scrollToTop }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    // Initial section detection
    detectActiveSection();

    // Event handlers
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      detectActiveSection();
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Check if user is logged in
    const checkAuth = () => {
      const isAuth = authService.isAuthenticated();
      setIsLoggedIn(isAuth);
      if (isAuth) {
        setUser(authService.getCurrentUser());
      }
    };

    checkAuth();

    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to detect which section is currently visible
  const detectActiveSection = () => {
    // Get all sections by their ID
    const sections = ["hero", "results", "about", "contact"];
    let currentSection = activeSection;

    // Determine which section is most visible
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if section is predominantly in view
        if (rect.top <= 100 && rect.bottom >= 300) {
          currentSection = section;
          break;
        }
      }
    }

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  };

  // Function for handling home navigation
  const handleHomeNavigation = (event) => {
    if (event) {
      event.preventDefault();
    }

    console.log("Home navigation triggered");

    // Get the hero section
    const heroSection = document.getElementById("hero");

    if (heroSection) {
      // Use the same smooth scrolling approach as other sections
      const sectionTop = heroSection.getBoundingClientRect().top + window.pageYOffset;

      // Apply smooth scrolling animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Additional animation for visual consistency with other nav items
      setTimeout(() => {
        heroSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 10);

      // Also try the direct scrollToTop if available
      if (scrollToTop) {
        scrollToTop();
      }
    } else {
      // Fallback
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    // Update active section
    setActiveSection("hero");

    // Add a subtle flash effect to the hero section to indicate activation
    if (heroSection) {
      heroSection.classList.add('section-activated');
      setTimeout(() => {
        heroSection.classList.remove('section-activated');
      }, 500);
    }
  };

  // Function for smooth scrolling
  const handleScrollToSection = (id, event) => {
    // Prevent default behavior if this was triggered by an event
    if (event) {
      event.preventDefault();
    }

    // Direct handling for home navigation
    if (id === "hero") {
      handleHomeNavigation(event);
      return;
    }

    console.log(`Scrolling to section: ${id}`);

    // For other sections
    const section = document.getElementById(id);
    if (section) {
      console.log(`Found section element with id: ${id}`);

      // Get the offset of the section from the top
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

      // Scroll to the section
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth"
      });

      // Alternative approach that might work better in some browsers
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 10);

      // Set active section
      setActiveSection(id);
    } else {
      console.log(`Section with id ${id} not found`);
    }
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSuccessfulAuth = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 md:py-6 px-4 md:px-8 lg:px-12",
        scrolled ? "bg-black/40 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo - Left */}
        <div className="flex-shrink-0">
          <button
            onClick={handleHomeNavigation}
            className="logo text-white text-2xl md:text-3xl font-bold flex items-center"
            data-nav="home"
            aria-label="Go to home section"
          >
            <span className="relative">
              Air<span className="text-blue-400 font-bold">Q</span>
            </span>
          </button>
        </div>

        {/* Navigation Links - Center */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center justify-center w-full gap-4 lg:gap-10 xl:gap-16">
            <NavLink
              onClick={handleHomeNavigation}
              isActive={activeSection === "hero"}
              label="Home"
              dataNav="home"
              dataSection="hero"
            />
            <NavLink
              onClick={(event) => handleScrollToSection("results", event)}
              isActive={activeSection === "results"}
              label="Results"
            />
            <NavLink
              onClick={(event) => handleScrollToSection("about", event)}
              isActive={activeSection === "about"}
              label="About"
            />
            <NavLink
              onClick={(event) => handleScrollToSection("contact", event)}
              isActive={activeSection === "contact"}
              label="Contact"
            />
          </div>
        </div>

        {/* Auth Button - Right */}
        <div className="flex-shrink-0 flex items-center">
          {isLoggedIn ? (
            <div className="relative group">
              <div className="flex items-center gap-2">
                <span className="text-white">Welcome, {user?.firstName || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="relative px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="z-10">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <button
                onClick={() => openAuthModal("login")}
                className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="z-10">Login</span>
                <span className="z-10">/</span>
                <span className="z-10">Register</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
          onSuccess={handleSuccessfulAuth}
        />
      )}
    </nav>
  );
};

const NavLink = ({ onClick, label, isActive, dataNav, dataSection }) => {
  return (
    <button
      onClick={onClick}
      className="px-2 text-sm md:text-base lg:text-lg font-medium transition-colors relative group"
      data-nav={dataNav}
      data-section={dataSection}
    >
      <span className={cn(
        "transition-colors duration-200",
        isActive ? "text-white font-semibold" : "text-white/70 group-hover:text-white"
      )}>
        {label}
      </span>
      <div
        className={cn(
          "absolute left-0 -bottom-2 h-0.5 bg-blue-400 rounded-full transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-1/2"
        )}
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease, opacity 0.3s ease'
        }}
      ></div>
    </button>
  );
};

const AuthModal = ({ isOpen, onClose, initialMode = "login", onSuccess }) => {
  const [mode, setMode] = useState(initialMode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden z-10 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-xl font-semibold text-white">
            {mode === "login" ? "Login" : "Create Account"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === "login" ? (
            <LoginForm onSwitchMode={() => setMode("register")} onSuccess={onSuccess} />
          ) : (
            <RegisterForm onSwitchMode={() => setMode("login")} onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ onSwitchMode, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      toast({
        title: "Success",
        description: "You have been logged in successfully",
        variant: "success"
      });
      onSuccess(response.user);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-slate-300">
            Password
          </label>
          <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
            Forgot password?
          </a>
        </div>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing in...
          </span>
        ) : "Sign in"}
      </button>

      <div className="mt-4 text-center">
        <p className="text-slate-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

const RegisterForm = ({ onSwitchMode, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      toast({
        title: "Success",
        description: "Your account has been created successfully",
        variant: "success"
      });
      onSuccess(response.user);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-300">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-300">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="registerEmail" className="block text-sm font-medium text-slate-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="Create a password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="Confirm your password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        ) : "Create Account"}
      </button>

      <div className="mt-4 text-center">
        <p className="text-slate-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default Navbar;
