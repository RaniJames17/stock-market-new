import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Fab,
  Slide,
} from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import StockInput from './components/StockInput';
import PredictionChart from './components/PredictionChart';
import { StockPredictor } from './services/stockPredictor';

function App() {
  const [stockData, setStockData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [predictor] = useState(new StockPredictor());

  const handleStockDataSubmit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate minimum data requirements
      if (data.length < 50) {
        throw new Error('Minimum 50 data points required for assignment compliance');
      }

      setStockData(data);
      
      // Train the neural network and make predictions
      const predictionResults = await predictor.predict(data);
      setPredictions(predictionResults);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          <TrendingUp sx={{ fontSize: 40, mr: 1, verticalAlign: 'middle' }} />
          Stock Market Prediction
        </Typography>
        <Typography variant="h6" color="text.secondary">
          AI-Powered Stock Price Forecasting with Brain.js
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Slide direction="down" in={success} mountOnEnter unmountOnExit>
          <Alert severity="success" sx={{ mb: 3 }}>
            Prediction completed successfully!
          </Alert>
        </Slide>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <StockInput onSubmit={handleStockDataSubmit} loading={loading} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Prediction Results
            </Typography>
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            )}
            {predictions.length > 0 && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  Neural network training completed successfully!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generated {predictions.length} predictions
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {predictions.slice(0, 5).map((pred, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      Day {index + 1} ({pred.date}): ${pred.price?.toFixed(2) || 'N/A'}
                      {pred.confidence && (
                        <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                          ({pred.confidence}% confidence)
                        </Typography>
                      )}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
            {predictions.length === 0 && !loading && (
              <Typography variant="body2" color="text.secondary">
                No predictions yet. Add stock data and click "Train & Predict" to get started.
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <PredictionChart
              historicalData={stockData}
              predictions={predictions}
              loading={loading}
            />
          </Paper>
        </Grid>
      </Grid>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Fab color="primary" disabled>
            <CircularProgress size={24} />
          </Fab>
        </Box>
      )}
    </Container>
  );
}

export default App;
