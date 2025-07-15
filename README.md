Walmart SellerHub 🛒
A comprehensive seller dashboard and analytics platform built for the Walmart Sparkathon, aimed at enhancing retail supply chain visibility and seller operations. This React-based application showcases key business metrics, AI-powered assistance, and product visibility prediction through a prototype experience.

🏆 Walmart Sparkathon Project
Developed as part of the Walmart Sparkathon competition, this project proposes innovative solutions to optimize seller efficiency, product visibility, and supply chain insights using AI and data-driven approaches.

✨ Features
📊 Dashboard & Analytics (Prototype View)
A visually rich dashboard showcasing key seller metrics like revenue, orders, and performance trends using sample (hardcoded) data to demonstrate UI/UX flow and business insights effectively.

🗺️ Order Fulfillment
Delivery Map: Interactive Leaflet map showing simulated delivery locations

Warehouse Logic: Nearest warehouse detection (e.g., Noida) using sample calculations

Route Optimization: Distance, ETA, and delivery charge (sample calculation: ₹163 for 31.57 km)

🤖 AI Assistant (Gemini API Integration)
AI-powered assistant for:

Product title & description optimization

Keyword suggestions & SEO tips

Sales strategy & competitor analysis

Voice Input: Voice-enabled chatbot mode

Language Support: Multilingual response generation

🔍 Product Visibility Predictor (Python ML Model)
Random Forest Model to predict listing visibility

Input fields include:

Title, price stability, stock status

Customer and seller pincodes

Returns a visibility score with Polaris-inspired ranking logic

🛠️ Tech Stack
Frontend
React.js, JavaScript (ES6+), CSS3

Chart.js / Recharts for visualizations

Leaflet / OpenStreetMap for maps

Backend / AI
Gemini API for AI Assistant

Python (Flask/FastAPI) for ML endpoint

Random Forest model for visibility prediction

Features
Responsive UI

Sample-based analytics and metrics

Interactive maps and charts

🚀 Getting Started
bash
Copy
Edit
git clone https://github.com/sanyxmm/Walmart-SellerHub.git
cd Walmart-SellerHub
npm install
npm start
Create a .env file:

env
Copy
Edit
REACT_APP_GEMINI_API_KEY=your_key_here
REACT_APP_ML_MODEL_ENDPOINT=http://localhost:5000/predict
📁 Project Structure
bash
Copy
Edit
walmart-sellerhub/
├── src/components/
│   ├── Dashboard/
│   ├── Analytics/
│   ├── OrderFulfillment/
│   ├── AIAssistant/
│   └── ProductVisibility/
├── python-ml-model/
│   ├── visibility_predictor.py
│   └── random_forest_model.pkl
└── .env
🔮 Future Enhancements
Live backend for real-time analytics and order tracking

Integration with Walmart Seller APIs

Advanced ML models for forecasting & trend detection

Deeper NLP capabilities in AI assistant

🏅 Sparkathon Value Proposition
AI Integration for product optimization

ML-based predictions to boost product visibility

Interactive prototype for visualizing seller workflow improvements

Modular React architecture for scalability

Built with ❤️ for Walmart Sparkathon – Reimagining Retail Efficiency with AI & Analytics
