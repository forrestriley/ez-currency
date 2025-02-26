import React, { useState, useEffect, useMemo } from 'react';
import Chart from 'chart.js';

function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=EUR')
      .then((response) => response.json())
      .then((data) => {
        const updatedRates = { EUR: 1, ...data.rates };
        setRates(updatedRates);
        setAvailableCurrencies(Object.keys(updatedRates));
      })
      .catch((err) => {
        console.error('Error fetching rates:', err);
        setError('Failed to fetch exchange rates. Please try again later.');
      });
  }, []);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const historical = Object.entries(data.rates).map(([date, rateObj]) => ({
          date,
          rate: rateObj[toCurrency]
        }));
        setHistoricalData(historical);
      })
      .catch((err) => {
        console.error('Error fetching historical data:', err);
        setHistoricalData([]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (historicalData.length === 0) return;

    const ctx = document.getElementById('historicalChart')?.getContext('2d');
    if (!ctx) return;

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: historicalData.map((data) => data.date),
        datasets: [
          {
            label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
            data: historicalData.map((data) => data.rate),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        }
      }
    });

    setChart(newChart);
  }, [historicalData, fromCurrency, toCurrency]);

  const convertedAmount = useMemo(() => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return 'N/A';
    if (!rates[fromCurrency] || !rates[toCurrency]) return 'N/A';
    if (fromCurrency === toCurrency) return parsedAmount.toFixed(2);
    return (parsedAmount * rates[toCurrency] / rates[fromCurrency]).toFixed(2);
  }, [amount, fromCurrency, toCurrency, rates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (availableCurrencies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Currency Converter</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div style={{ margin: '10px 0' }}>
        <button onClick={swapCurrencies}>⇄ Swap</button>
      </div>
      <div>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>{convertedAmount}</span>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Historical Exchange Rates (Last 30 Days)</h3>
        <canvas id="historicalChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default CurrencyConverter;