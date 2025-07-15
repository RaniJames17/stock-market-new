# Stock Market Prediction App - Assignment 4 -Part 1

**Course Assignment**: Stock Market Prediction using Brain.js  
**Group Members**: Ethili Sundaravel - 500236470
                   Ishaben Bhatt - 500237391
                   Rani James - 500237541

## 🔗 Links

- **GitHub Repository**: [Add your repo link here]
- **Deployed Application**: [Add your Netlify/Vercel link here]

## 📋 Assignment Overview

This React application uses Brain.js to predict stock market prices through a feedforward neural network. The app demonstrates understanding of HTML, CSS, JavaScript, React, and Brain.js by implementing a complete stock price prediction system that meets all assignment requirements.


## 🛠️ Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**:
```bash
git clone [your-repository-url]
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


## 🎯 Usage Instructions

### 1. Data Input
- **Manual Entry**: Add individual data points using the form
- **Sample Data**: Click the magic wand icon to generate test data

### 2. Model Training
- Ensure you have at least 50 data points
- Click "Train & Predict" to start the neural network training
- Wait for training completion (progress indicators provided)

### 3. View Results
- **Predictions Panel**: Shows next 5 days with confidence scores
- **Chart**: Visual representation of historical vs predicted data
- **Trend Analysis**: Color-coded indicators for price movements

## 🚀 Deployment Instructions

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Build command: `npm run build`
5. Output directory: `build`

## ⚠️ Important Notes

### Academic Integrity
- All code is original work
- External libraries used are properly documented
- Neural network implementation follows Brain.js best practices

### Limitations
- **Educational Purpose**: This app is for learning and demonstration
- **Not Financial Advice**: Predictions should not be used for actual trading
- **Market Complexity**: Real markets are influenced by many factors not captured in this simple model

### Assignment Compliance
- ✅ Minimum 50 data points enforced
- ✅ Brain.js feedforward network implemented
- ✅ Chart.js visualization with clear data differentiation
- ✅ Responsive React UI with proper component structure
- ✅ File upload and manual data entry supported
- ✅ Comprehensive documentation provided

## 🔧 Technical Implementation Details

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

### State Management
- React hooks for local state
- Props for component communication
- Centralized state in main App component

### Error Handling
- File upload validation
- Data format verification
- Model training error handling
- User-friendly error messages

## 📈 Future Enhancements

- Real-time stock data API integration
- Multiple prediction models (LSTM, ARIMA)
- Technical indicators (RSI, MACD)
- Portfolio analysis features
- Historical model performance tracking

## 👨‍💻 Author

**[Your Name]**  
Student ID: [Your Student ID]  
Course: [Course Name]  
Institution: [Your Institution]  

---

*This project was developed as part of Assignment 4 for the course requirements, demonstrating proficiency in React, Brain.js, and modern web development practices.*
