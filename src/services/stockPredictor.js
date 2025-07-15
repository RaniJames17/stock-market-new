import * as brain from 'brain.js';

export class StockPredictor {
  constructor() {
    this.network = new brain.NeuralNetwork({
      hiddenLayers: [3, 3],
      activation: 'sigmoid',
      learningRate: 0.3,
      iterations: 2000,
      log: true,
      logPeriod: 100,
    });
  }

  // Normalize data to 0-1 range
  normalizeData(data) {
    const values = data.map(d => d.price);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    return {
      normalized: data.map(d => ({
        ...d,
        normalizedPrice: (d.price - min) / (max - min)
      })),
      min,
      max
    };
  }

  // Denormalize prediction back to original range
  denormalizePrice(normalizedPrice, min, max) {
    return normalizedPrice * (max - min) + min;
  }

  // Create training data with sequence length
  createTrainingData(normalizedData, sequenceLength = 5) {
    const trainingData = [];
    
    for (let i = 0; i < normalizedData.length - sequenceLength; i++) {
      const input = normalizedData
        .slice(i, i + sequenceLength)
        .map(d => d.normalizedPrice);
      
      const output = [normalizedData[i + sequenceLength].normalizedPrice];
      
      trainingData.push({ input, output });
    }
    
    return trainingData;
  }

  // Train the neural network
  async train(data) {
    const { normalized, min, max } = this.normalizeData(data);
    const trainingData = this.createTrainingData(normalized);
    
    if (trainingData.length === 0) {
      throw new Error('Insufficient data for training. Please provide at least 50 data points as required by the assignment.');
    }

    console.log('Training neural network...');
    const stats = this.network.train(trainingData);
    console.log('Training completed:', stats);
    
    return { min, max, normalized };
  }

  // Make predictions
  async predict(data, daysToPredict = 5) {
    if (!data || data.length < 50) {
      throw new Error('Please provide at least 50 historical data points as required by the assignment.');
    }

    // Train the network
    const { min, max, normalized } = await this.train(data);
    
    // Make predictions
    const predictions = [];
    const sequenceLength = 5;
    
    // Use the last 5 data points as input for prediction
    let currentInput = normalized
      .slice(-sequenceLength)
      .map(d => d.normalizedPrice);
    
    for (let i = 0; i < daysToPredict; i++) {
      const prediction = this.network.run(currentInput);
      const denormalizedPrice = this.denormalizePrice(prediction[0], min, max);
      
      // Create date for prediction (assuming daily data)
      const lastDate = new Date(data[data.length - 1].date);
      const predictionDate = new Date(lastDate);
      predictionDate.setDate(lastDate.getDate() + i + 1);
      
      predictions.push({
        date: predictionDate.toISOString().split('T')[0],
        price: Math.round(denormalizedPrice * 100) / 100,
        confidence: this.calculateConfidence(prediction[0])
      });
      
      // Update input for next prediction
      currentInput = [...currentInput.slice(1), prediction[0]];
    }
    
    return predictions;
  }

  // Calculate confidence score (simplified)
  calculateConfidence(normalizedValue) {
    // This is a simplified confidence calculation
    // In a real application, you might use more sophisticated methods
    const baseConfidence = 0.7;
    const variation = Math.abs(normalizedValue - 0.5) * 0.3;
    return Math.round((baseConfidence + variation) * 100);
  }

  // Generate sample data for testing (minimum 50 data points as per assignment)
  generateSampleData(symbol = 'AMZN', days = 60) {
    const data = [];
    
    // Set realistic base prices for different companies
    const basePrices = {
      'AMZN': 150,
      'GOOGL': 140,
      'CRM': 250,
      'MSFT': 390,
      'NVDA': 900
    };
    
    // Set realistic volatility for different companies
    const volatilities = {
      'AMZN': 8,
      'GOOGL': 7,
      'CRM': 12,
      'MSFT': 6,
      'NVDA': 25
    };
    
    let price = basePrices[symbol] || 150;
    const volatility = volatilities[symbol] || 8;
    let trend = (Math.random() - 0.5) * 0.02; // Overall trend
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Add realistic price movement with trend and volatility
      const dailyChange = (Math.random() - 0.5) * volatility; // Daily volatility
      const trendChange = trend * price * 0.01; // Trend component
      const weekdayEffect = date.getDay() === 1 ? 2 : (date.getDay() === 5 ? -1 : 0); // Monday/Friday effect
      
      price = Math.max(50, price + dailyChange + trendChange + weekdayEffect);
      
      // Add some market events (random spikes/dips)
      if (Math.random() < 0.05) {
        price *= (Math.random() < 0.5 ? 0.95 : 1.05); // 5% chance of 5% move
      }
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.round(price * 100) / 100,
        symbol: symbol,
        volume: Math.floor(1000000 + Math.random() * 5000000) // Add volume data
      });
    }
    
    return data;
  }

  // Parse CSV data format
  parseCSVData(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const entry = {};
      
      headers.forEach((header, index) => {
        entry[header] = values[index]?.trim();
      });
      
      // Convert to our expected format
      if (entry.date && entry.price) {
        data.push({
          date: entry.date,
          price: parseFloat(entry.price),
          symbol: entry.symbol || 'UNKNOWN',
          volume: entry.volume ? parseInt(entry.volume) : undefined
        });
      }
    }
    
    return data;
  }

  // Parse JSON data format
  parseJSONData(jsonText) {
    try {
      const data = JSON.parse(jsonText);
      if (Array.isArray(data)) {
        return data.map(item => ({
          date: item.date,
          price: parseFloat(item.price),
          symbol: item.symbol || 'UNKNOWN',
          volume: item.volume ? parseInt(item.volume) : undefined
        }));
      }
      return [];
    } catch (error) {
      throw new Error('Invalid JSON format');
    }
  }
}
