import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Timeline } from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PredictionChart = ({ historicalData, predictions, loading }) => {
  const chartRef = useRef(null);

  if (loading) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
          Price Chart
        </Typography>
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Generating predictions...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!historicalData || historicalData.length === 0) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
          Price Chart
        </Typography>
        <Alert severity="info">
          No data to display. Add historical stock data to see the chart.
        </Alert>
      </Box>
    );
  }

  // Prepare data for Chart.js
  const historicalLabels = historicalData.map(d => 
    new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );
  const historicalPrices = historicalData.map(d => d.price);
  
  const predictionLabels = predictions.map(p => 
    new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  );
  const predictionPrices = predictions.map(p => p.price);

  // Combine labels and create datasets
  const allLabels = [...historicalLabels, ...predictionLabels];
  
  const datasets = [
    {
      label: 'Historical Prices',
      data: [...historicalPrices, ...Array(predictionPrices.length).fill(null)],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ];

  // Add prediction dataset if we have predictions
  if (predictions.length > 0) {
    datasets.push({
      label: 'Predictions',
      data: [
        ...Array(historicalPrices.length - 1).fill(null),
        historicalPrices[historicalPrices.length - 1], // Connect with last historical point
        ...predictionPrices,
      ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      fill: false,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderDash: [5, 5],
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Stock Price Prediction - ${historicalData[0]?.symbol || 'Stock'}`,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price ($)',
        },
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  const chartData = {
    labels: allLabels,
    datasets: datasets,
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
        Price Chart
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Historical prices (solid line) and AI predictions (dashed line)
      </Typography>

      <Box sx={{ height: 400, position: 'relative' }}>
        <Line 
          ref={chartRef}
          data={chartData} 
          options={options} 
        />
      </Box>

      {predictions.length > 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            The chart shows {historicalData.length} historical data points and {predictions.length} AI-generated predictions.
            The dashed line represents the neural network's forecast based on the training data.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default PredictionChart;
