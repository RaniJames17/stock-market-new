# Stock Market Prediction App - Assignment 4 -Part 1

**Course Assignment**: Stock Market Prediction using Brain.js  
**Group Members**: Ethili Sundaravel - 500236470
                   Ishaben Bhatt - 500237391
                   Rani James - 500237541

## 🔗 Links

- **GitHub Repository**: [(https://github.com/RaniJames17/stock-market)]
- **Deployed Application**: [Add your Netlify link here]

## 📋 Assignment Overview

This React application uses Brain.js to predict stock market prices through a feedforward neural network. The app demonstrates understanding of HTML, CSS, JavaScript, React, and Brain.js by implementing a complete stock price prediction system that meets all assignment requirements.

## 🚀 Deployment

### Netlify Deployment (Current)

This app is configured for deployment on Netlify. The configuration includes:

- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **SPA Redirects**: Configured for React Router
- **Environment**: Node.js 18, npm 9
- **Security Headers**: XSS protection, frame options, content type options
- **Caching**: Optimized for static assets and build artifacts

#### Deploy to Netlify:

1. **Via Git Integration**:
   - Connect your GitHub repository to Netlify
   - Netlify will auto-deploy on commits to main branch
   - Build settings are configured in `netlify.toml`

2. **Manual Deploy**:
   ```bash
   npm run build
   # Then drag and drop the 'build' folder to Netlify
   ```

3. **Netlify CLI** (optional):
   ```bash
   npm install -g netlify-cli
   netlify deploy --dir=build --prod
   ```


## 🛠️ Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**:
```bash
git clone [https://github.com/RaniJames17/stock-market]
cd stock-market
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

4. **Open in browser**:
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📊 Dataset Format and Usage

### Supported File Formats

#### CSV Format
```csv
date,price,symbol,volume
2024-01-01,150.25,AAPL,1000000
2024-01-02,152.30,AAPL,1200000
...
```

#### JSON Format
```json
[
  {
    "date": "2024-01-01",
    "price": 150.25,
    "symbol": "AAPL",
    "volume": 1000000
  },
  {
    "date": "2024-01-02",
    "price": 152.30,
    "symbol": "AAPL",
    "volume": 1200000
  }
]
```

### Required Fields
- `date`: Date in YYYY-MM-DD format
- `price`: Stock price (numeric)
- `symbol`: Stock symbol (optional)
- `volume`: Trading volume (optional)

### Data Requirements
- **Minimum**: 50 data points (assignment requirement)
- **Recommended**: 60+ data points for better accuracy

## 🧠 Model Logic

### Neural Network Architecture
```
Input Layer (5 neurons) → Hidden Layer (3 neurons) → Hidden Layer (3 neurons) → Output Layer (1 neuron)
```

### Training Process
1. **Data Preprocessing**:
   - Normalize prices to 0-1 range
   - Create sequence windows (5 days → 1 day prediction)
   - Prepare training data format

2. **Model Training**:
   - Feedforward neural network
   - Backpropagation learning
   - 2000 iterations
   - Learning rate: 0.3

3. **Prediction Generation**:
   - Use last 5 days as input
   - Generate next 5 days predictions
   - Denormalize back to price range
   - Calculate confidence scores

### Confidence Scoring
- Based on prediction stability
- Range: 0-100%
- Higher values indicate more reliable predictions

## 📚 Third-Party Libraries

### Core Dependencies
- **React** (^18.2.0): Frontend framework
- **Brain.js** (^2.0.0-beta.24): Neural network library
- **Chart.js** (^4.4.0): Data visualization
- **react-chartjs-2** (^5.2.0): React wrapper for Chart.js

### Component Structure
```
src/
├── components/
│   ├── StockInput.js          # Data input and file upload
│   ├── PredictionResults.js   # Results display with confidence
│   └── PredictionChart.js     # Chart.js visualization
├── services/
│   └── stockPredictor.js      # Brain.js neural network
├── App.js                     # Main application logic
└── index.js                   # React entry point
```
