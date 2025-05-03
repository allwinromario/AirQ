import React from "react";
import { ChartBar, AreaChart } from "lucide-react";

const Results = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center relative bg-gray-950/95" id="results">
      <div className="container px-7 py-12 md:py-0 h-full flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Results
          </h2>
          <p className="text-white/70">
            Our cutting-edge approach combines satellite data with machine learning to provide unprecedented air quality insights.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-8">
          <ResultCard
            title="Our Planet's Air"
            description="Our Planet's Air visualizes real-time air quality data from the World Air Quality Index API, showing key pollutants like PM2.5, PM10, NO2, and CO on an interactive map to track pollution trends."
            link="http://airqnet.netlify.app"
            className="w-full md:w-1/2 bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          />

          <ResultCard
            title="Sentinel-5P NO2 Data Downscaling"
            description="This application processes and visualizes Sentinel-5P satellite NO₂ data through interactive maps that display global pollution patterns. It enhances the data quality by downscaling low-resolution air quality measurements to higher resolution using multiple scientific techniques including Gaussian smoothing, bilinear/cubic interpolation, and machine learning-based regression. The tool provides comprehensive analysis capabilities by comparing original and processed data through difference maps and statistical metrics, while also offering export options to facilitate further research and reporting."
            link="https://vidhi2004-downscalingi-website-app-ezsu40.streamlit.app/"
            className="w-full md:w-1/2 bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
          />

          {/*<ResultCard
            title="Air Quality Edge Functions"
            description="Air Quality Edge Functions uses Netlify Edge Functions to fetch real-time air quality data, delivering key pollutants like PM2.5, PM10, and CO for fast, dynamic updates."
            link="YOUR_BACKEND_LINK_HERE"
          />*/}
        </div>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> 1fceb127496b5f913cec21f50f5013c93415e9b5
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
    </div>
  );
};

const ResultCard = ({ icon, title, description, link }) => {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/20 hover:transform hover:scale-105 duration-300">
      {/* Show icon if available, else show button */}
      {icon ? (
        <div className="bg-black/20 rounded-xl p-3 w-fit mb-4">{icon}</div>
      ) : link ? (
        <button
          onClick={() => window.location.href = link}
          className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View
        </button>
      ) : null}

      <h3 className="font-display text-xl font-medium mb-2">{title}</h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

export default Results;
