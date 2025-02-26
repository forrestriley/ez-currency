import React, { useState, useEffect, useMemo } from 'react';

function LiteCurrencySwapper() {
  // Define the 5 most common currencies
  const currencies = ["EUR", "USD", "JPY", "GBP", "CHF"];

  // State variables
  const [rates, setRates] = useState(null);           // Exchange rates relative to EUR
  const [fromCurrency, setFromCurrency] = useState('EUR'); // Default: EUR
  const [toCurrency, setToCurrency] = useState('USD');     // Default: USD
  const [amount, setAmount] = useState('1');          // Default amount: 1

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/latest?to=USD,JPY,GBP,CHF');
        const data = await response.json();
        // Add EUR with rate 1 since it's the base currency
        const allRates = { EUR: 1, ...data.rates };
        setRates(allRates);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };
    fetchRates();
  }, []);

  // Calculate converted amount efficiently
  const convertedAmount = useMemo(() => {
    if (!rates || !fromCurrency || !toCurrency) return '';
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return ''; // Invalid input handling
    if (fromCurrency === toCurrency) return amountNum.toFixed(2); // Same currency
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    if (!rateFrom || !rateTo) return '';
    // Conversion formula: amount * (rateTo / rateFrom)
    return (amountNum * (rateTo / rateFrom)).toFixed(2);
  }, [amount, fromCurrency, toCurrency, rates]);

  // Swap "from" and "to" currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Render the UI
  return (
    <div style={{ padding: '20px' }}>
      {rates ? (
        <div>
          <div>
            <label htmlFor="fromCurrency">From:</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{ marginRight: '10px' }}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button onClick={swapCurrencies} style={{ marginRight: '10px' }}>
              ⇄
            </button>
            <label htmlFor="toCurrency" style={{ marginRight: '10px' }}>To:</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Converted Amount: {convertedAmount}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default LiteCurrencySwapper;