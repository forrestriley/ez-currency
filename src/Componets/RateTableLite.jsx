import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function LiteExchangeRatesTable() {
  //Top 5 most commonly used currencies
  const topCurrencies = ["EUR", "USD", "JPY", "GBP", "AUD"];
  
  const [rates, setRates] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [mainCurrency, setMainCurrency] = useState('EUR');
  const [error, setError] = useState(null);

  useEffect(() => {

    const toParam = topCurrencies.filter(c => c !== "EUR").join(",");
    fetch(`https://api.frankfurter.app/latest?to=${toParam}`)
      .then(response => response.json())
      .then(data => {
        
        const allRates = { EUR: 1, ...data.rates };
        setRates(allRates);
        
        setAvailableCurrencies(topCurrencies.sort());
      })
      .catch(error => {
        console.error('Error fetching rates:', error);
        setError('Failed to fetch exchange rates. Please try again later.');
      });
  }, []);

  const relativeRates = useMemo(() => {
    if (!rates || !mainCurrency) return {};
    const baseRate = rates[mainCurrency];
    if (!baseRate) return {};
    return Object.fromEntries(
      availableCurrencies.map(currency => [
        currency,
        (rates[currency] / baseRate).toFixed(4)
      ])
    );
  }, [rates, mainCurrency, availableCurrencies]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!rates) {
    return <div>Loading...</div>;
  }

  return (
    <div class="row">
      <div className="col-12">
      <h2>Common Exchange Rates</h2>
      <div>
        <label htmlFor="mainCurrency">Main Currency: </label>
        <select
          id="mainCurrency"
          value={mainCurrency}
          onChange={e => setMainCurrency(e.target.value)}
        >
          {availableCurrencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Currency</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>
              Rate (per 1 {mainCurrency})
            </th>
          </tr>
        </thead>
        <tbody>
          {availableCurrencies.map(currency => (
            <tr key={currency}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{currency}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {relativeRates[currency]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default LiteExchangeRatesTable;