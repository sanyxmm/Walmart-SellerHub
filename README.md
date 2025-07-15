# 🛒 Walmart SellerHub

**Walmart SellerHub** is a prototype **seller dashboard and analytics platform** built for the **Walmart Sparkathon**, aimed at enhancing **retail supply chain visibility** and **seller operations** through AI-driven insights, product optimization tools, and visibility predictions.

---

## 🏆 Walmart Sparkathon Project

Developed as a submission for **Walmart Sparkathon 2025**, this project introduces innovative solutions to improve seller productivity, listing performance, and order fulfillment using **AI**, **data visualization**, and **ML models**.

---

## ✨ Features

### 📊 Dashboard & Analytics (Prototype)

- Interactive dashboard with simulated key metrics: **revenue, orders, and trends**
- Built using **hardcoded sample data** to demonstrate **UI/UX flow** and potential business insights

---

### 🗺️ Order Fulfillment

- **Delivery Map**: Leaflet-based simulated delivery locations
- **Warehouse Logic**: Detects nearest warehouse (e.g., Noida) using basic geo-calculations
- **Route Optimization**:
  - Shows estimated distance, delivery time, and charges  
  - _Example: ₹163 for 31.57 km_

---

### 🤖 AI Assistant (Gemini API)

Integrated Gemini-powered assistant to help sellers:

- Optimize **product titles** and **descriptions**
- Generate **keywords** and **SEO strategies**
- Analyze **competitors** and **sales strategy**
- **Voice input** support and **multilingual** output

---

### 🔍 Product Visibility Predictor (Python ML)

- Uses a **Random Forest** model to predict listing visibility
- Input: title, price stability, stock status, pincodes, etc.
- Output: **visibility score** based on Polaris-like logic

---

## 🛠️ Tech Stack

### Frontend
- React.js, JavaScript (ES6+), CSS3
- Chart.js / Recharts (visualizations)
- Leaflet / OpenStreetMap (maps)

### Backend & AI
- Gemini API (AI assistant)
- Python (Flask/FastAPI) for ML endpoint
- Trained Random Forest model for visibility predictions

---

## 🧩 Features Summary

- 📱 Responsive UI  
- 📈 Sample-based data for dashboard & analytics  
- 🗺️ Interactive map for delivery tracking  
- 🤖 AI tools for content optimization  
- 🔍 ML model for product visibility scoring  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sanyxmm/Walmart-SellerHub.git
cd Walmart-SellerHub
