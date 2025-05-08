# 🌬️ AirQ - Downscaling of Satellite based air quality map using AI/ML

## 📋 Overview

AirQ leverages Artificial Intelligence and Machine Learning to transform coarse-resolution satellite-based air quality data into high-resolution, actionable maps. By integrating satellite imagery, ground sensor readings, and meteorological parameters, AirQ generates precise NO₂ concentration maps, supporting better decision-making for researchers, policymakers, and environmental agencies. This project aims to bridge the gap between low-resolution air quality data and the high spatial resolution needed for effective pollution management and public health protection.

## 🏗️ Project Structure

```
AirQ/
├── frontend/           # React frontend application
├── backend/            # Node.js Express backend 
└── downscale/          # Air quality data processing and visualization
```

## ✨ Features

- **🔐 Secure Authentication** - User registration and login with JWT
- **📊 Air Quality Monitoring** - Real-time environmental data tracking
- **📱 Responsive Design** - Works across devices and screen sizes
- **🔄 REST API** - Comprehensive backend API for data access
- **🛡️ Data Security** - MongoDB integration for secure data storage
- **🔍 Data Downscaling** - Advanced spatial downscaling of NO₂ satellite data
- **🤖 AI/ML-Driven Downscaling** – Utilizes advanced models (CNNs, Random Forest, deep learning) to enhance the spatial resolution of satellite air quality data.
- **🛰️ Multi-Source Data Integration** – Combines satellite imagery, ground-based sensor data, and meteorological factors for robust predictions.
- **🗺️ High-Resolution Air Quality Maps** – Generates detailed NO₂ concentration maps for urban and rural regions.
- **✅ Validation with Real-World Data** – Ensures model accuracy and robustness using independent, real-world air quality datasets.
- **🧭 Decision Support** – Provides actionable insights for policymakers and environmental agencies to improve air quality assessment and pollution control.
- **🌍 Scalable & Adaptable** – Applicable to various regions and adaptable to different pollutants and data sources.
- **📈 Interactive Visualization & Export** – Visualize, compare, and export high-resolution air quality data and analytics.

## 📉 Downscale Application

The downscale application is a vital component of AirQ that processes and visualizes air quality data. Built with Streamlit, it offers:

### Key Features

- **Satellite Data Processing** - Import and process Sentinel-5P NO₂ satellite imagery
- **Advanced Downscaling Methods** - Multiple techniques including:
  - Gaussian Smoothing
  - Bilinear Interpolation
  - Cubic Spline
  - Regression-Based Approach
- **Interactive Visualization** - Compare original, processed, and downscaled data
- **Statistical Analysis** - View distribution and metrics of air quality data
- **Export Options** - Save visualizations in various formats (PNG, PDF, CSV)

### Using the Downscale Application

1. Navigate to the downscale directory:
   ```bash
   cd downscale
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the application:
   ```bash
   streamlit run app.py
   ```

4. Access the app in your browser at [http://localhost:8501](http://localhost:8501)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Python 3.7+ (for downscale application)

### MongoDB Setup

1. Create a free MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new cluster (the free tier is sufficient for development)
3. Under "Database Access", create a new database user with read/write permissions
4. Under "Network Access", add your IP address or allow access from anywhere for development
5. Under "Databases", click "Connect" on your cluster, select "Connect your application", and copy the connection string

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/airq?retryWrites=true&w=majority
   JWT_SECRET=your_strong_secret_key
   JWT_EXPIRY=30d
   ```

   Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials.

4. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:8080](http://localhost:8080)

## 💻 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JSON Web Tokens (JWT)

### Downscale Application
- Python
- Streamlit
- Matplotlib
- NumPy
- Pandas
- scikit-learn
- SciPy
- Cartopy
- Rasterio

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| POST | `/api/auth/register` | Register a new user | `{ "firstName": "John", "lastName": "Doe", "email": "john@example.com", "password": "password123" }` |
| POST | `/api/auth/login` | Login existing user | `{ "email": "john@example.com", "password": "password123" }` |
| GET | `/api/auth/me` | Get current user info | Requires authentication token |

## 👥 Contributors

- **V. Allwin Fernando**
- **Vidhi Kamat**
- **Fathima Kohnain**
- **Yusuf Furqan**


