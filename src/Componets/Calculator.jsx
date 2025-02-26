import React, { useState, useEffect, useMemo } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState('1'); 
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates, setRates] = useState({});
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest?from=EUR')
      .then((response) => response.json())
      .then((data) => {
        const updatedRates = { EUR: 1, ...data.rates }; // 
        setRates(updatedRates);
        setAvailableCurrencies(Object.keys(updatedRates));
      })
      .catch((err) => {
        console.error('Error fetching rates:', err);
        setError('Failed to fetch exchange rates. Please try again later.');
      });
  }, []);

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
    </div>
  );
}

export default CurrencyConverter;