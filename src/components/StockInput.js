import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Alert,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  TrendingUp,
  AutoFixHigh,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StockPredictor } from '../services/stockPredictor';

const StockInput = ({ onSubmit, loading }) => {
  const [stockData, setStockData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date(),
    price: '',
    symbol: '',
  });
  const [errors, setErrors] = useState({});

  // Available stock symbols
  const availableSymbols = [
    { value: 'AMZN', label: 'Amazon (AMZN)' },
    { value: 'GOOGL', label: 'Google (GOOGL)' },
    { value: 'CRM', label: 'Salesforce (CRM)' },
    { value: 'MSFT', label: 'Microsoft (MSFT)' },
    { value: 'NVDA', label: 'Nvidia (NVDA)' },
  ];

  const handleAddEntry = () => {
    const validationErrors = {};
    
    if (!newEntry.date) {
      validationErrors.date = 'Date is required';
    }
    
    if (!newEntry.price || isNaN(newEntry.price) || parseFloat(newEntry.price) <= 0) {
      validationErrors.price = 'Valid price is required';
    }
    
    if (!newEntry.symbol) {
      validationErrors.symbol = 'Please select a symbol';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check for duplicate dates
    const dateString = newEntry.date.toISOString().split('T')[0];
    if (stockData.some(entry => entry.date === dateString)) {
      setErrors({ date: 'Date already exists' });
      return;
    }

    const entry = {
      date: dateString,
      price: parseFloat(newEntry.price),
      symbol: newEntry.symbol,
    };

    setStockData([...stockData, entry].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setNewEntry({
      date: new Date(),
      price: '',
      symbol: newEntry.symbol,
    });
    setErrors({});
  };

  const handleRemoveEntry = (index) => {
    setStockData(stockData.filter((_, i) => i !== index));
  };

  const handleGenerateSample = () => {
    const predictor = new StockPredictor();
    const selectedSymbol = newEntry.symbol || availableSymbols[0].value;
    const sampleData = predictor.generateSampleData(selectedSymbol, 60);
    setStockData(sampleData);
  };

  const handleSubmit = () => {
    if (stockData.length < 6) {
      setErrors({ general: 'Please provide at least 6 data points for prediction' });
      return;
    }
    
    setErrors({});
    onSubmit(stockData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h5" gutterBottom>
          <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
          Stock Data Input
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter historical stock prices or generate sample data to train the prediction model.
        </Typography>

        {errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.general}
          </Alert>
        )}

        <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth size="small" error={!!errors.symbol}>
                <InputLabel>Symbol</InputLabel>
                <Select
                  value={newEntry.symbol}
                  label="Symbol"
                  onChange={(e) => setNewEntry({ ...newEntry, symbol: e.target.value })}
                >
                  {availableSymbols.map((symbol) => (
                    <MenuItem key={symbol.value} value={symbol.value}>
                      {symbol.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.symbol && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.symbol}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <DatePicker
                label="Date"
                value={newEntry.date}
                onChange={(date) => setNewEntry({ ...newEntry, date })}
                slotProps={{
                  textField: {
                    size: 'small',
                    error: !!errors.date,
                    helperText: errors.date,
                    fullWidth: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Price ($)"
                type="number"
                value={newEntry.price}
                onChange={(e) => setNewEntry({ ...newEntry, price: e.target.value })}
                error={!!errors.price}
                helperText={errors.price}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={handleAddEntry}
                  startIcon={<AddIcon />}
                  size="small"
                  disabled={loading}
                >
                  Add
                </Button>
                <Tooltip title="Generate sample data">
                  <IconButton
                    onClick={handleGenerateSample}
                    color="primary"
                    disabled={loading}
                  >
                    <AutoFixHigh />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Historical Data ({stockData.length} entries)
          </Typography>
          
          {stockData.length === 0 ? (
            <Alert severity="info">
              No data entries yet. Add some historical stock prices or generate sample data.
            </Alert>
          ) : (
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              <Stack spacing={1}>
                {stockData.map((entry, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Chip label={entry.symbol} size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2" component="span">
                          {entry.date} - ${entry.price}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveEntry(index)}
                        disabled={loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={loading || stockData.length < 6}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? 'Training Model...' : 'Train & Predict'}
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default StockInput;