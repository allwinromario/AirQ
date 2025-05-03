import React, { useState } from "react";
import { LogIn, UserPlus, Mail, Send } from "lucide-react";

const CTA = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
  });
  const [toast, setToast] = useState(null);

  // Form validation
  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateName = (name) => {
    return name.length >= 2;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Mock toast function
  const showToast = (title, description, variant = "default") => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email) ? "Please enter a valid email address" : "",
      name: !validateName(formData.name) ? "Name must be at least 2 characters" : "",
    };

    setErrors(newErrors);

    // If no errors, proceed with form submission
    if (!newErrors.email && !newErrors.name) {
      console.log("Form submitted:", formData);
      showToast("Registration Successful", `Thank you for joining, ${formData.name}!`);
      setIsRegisterOpen(false);
      setFormData({ email: "", name: "" });
    }
  };

  // Handle sign in form submission
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    // Simple validation
    if (!email || !validateEmail(email)) {
      showToast("Invalid Email", "Please enter a valid email address", "destructive");
      return;
    }

    showToast("Sign In Successful", "Welcome back to AirQ!");
    setIsSignInOpen(false);
  };

  return (
    <div className="h-full w-full flex items-center justify-center relative bg-gradient-to-b from-gray-900 to-black" id="contact">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        {/* Stars effect */}
        <div className="stars-container absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container px-4 py-12 relative z-10 mx-auto flex items-center justify-center">
        <div className="rounded-xl border border-gray-700 bg-gray-900/80 backdrop-blur-md p-8 md:p-16 max-w-3xl w-full shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Connect with Us for Smarter Air Quality Insights
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Have questions or need support? Get in touch with our team and explore how AI/ML can enhance air quality monitoring and analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Register Button */}
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 py-3 text-base font-medium gap-2 text-white flex items-center w-full sm:w-auto justify-center"
              >
                <UserPlus className="h-5 w-5" />
                Support
              </button>

              {/* Sign In Button */}
              <button
                onClick={() => setIsSignInOpen(true)}
                className="rounded-full bg-transparent hover:bg-white/5 px-8 py-3 text-base font-medium gap-2 border border-gray-600 text-white flex items-center w-full sm:w-auto justify-center"
              >
                <LogIn className="h-5 w-5" />
                Contact Us
              </button>
            </div>

            {/* Register Dialog */}
            {isRegisterOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white text-xl font-semibold">Join AirQ Community</h3>
                      <p className="text-gray-400">
                        Get access to our data and tools.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsRegisterOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white block">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white block">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Support Us
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Sign In Dialog */}
            {isSignInOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white text-xl font-semibold">Welcome Back</h3>
                      <p className="text-gray-400">
                        Sign in to your AirQ account if any help required.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSignInOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white block">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white block">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Toast Message */}
            {toast && (
              <div
                className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${toast.variant === "destructive" ? "bg-red-600" : "bg-green-600"
                  } shadow-lg flex items-center transition-opacity`}
              >
                <div className="mr-2">
                  {toast.variant === "destructive" ? "✕" : "✓"}
                </div>
                <div>
                  <h4 className="font-medium">{toast.title}</h4>
                  <p className="text-sm opacity-90">{toast.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
