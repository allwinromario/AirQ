import React from "react";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative bg-space-dark" id="about">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-space-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-space-teal/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container px-4 py-12 md:py-0 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <img
                  src="https://assets.weforum.org/editor/7M54BLw4xjnDb9tqOwvUbVgeO0FAdExKyJbBa8m-cQE.PNG"
                  alt="Air quality sensors and data visualization"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-space-blue/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-space-teal/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          <div>
            <span className="text-space-blue font-medium text-sm uppercase tracking-wider">About Our Project</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
              Transforming Environmental Monitoring with AI
            </h2>

            <div className="space-y-4 text-white/80">
              <p>
                Our project harnesses advanced artificial intelligence and machine learning techniques to transform satellite-derived air quality data into detailed, high-resolution maps. This approach offers unparalleled insights into local air quality conditions, facilitating more informed environmental decisions.              </p>
              <p>
                By downscaling satellite imagery, we provide fine-grained air quality information, empowering researchers, policymakers, and the public to better understand and address environmental health concerns.              </p>
              <p>
                This innovative fusion of global satellite data and precise ground-level measurements creates a comprehensive system for monitoring and analyzing air quality trends across diverse regions.              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <Stat value="10x" label="Higher Resolution" />
              <Stat value="95%" label="Prediction Accuracy" />
              <Stat value="24/7" label="Real-time Monitoring" />
              <Stat value="100+" label="Regions Covered" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ value, label }) => {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="text-white/60 text-sm">{label}</p>
    </div>
  );
};

export default About;
