import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8000/prices');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    
<div className="container mx-auto p-4">
  <h2 className="font-bold text-center m-3 text-2xl">Crypto Currency Dashboard</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2 border-l-2 border-gray-500">MA 20</th>
            <th className="px-4 py-2">MA 50</th>
            <th className="px-4 py-2">MA 100</th>
            <th className="px-4 py-2">MA 200</th>
            <th className="px-4 py-2 border-l-2 border-gray-500">24h High</th>
            <th className="px-4 py-2">24h Low</th>
            <th className="px-4 py-2 border-l-2 border-gray-500">1w High</th>
            <th className="px-4 py-2">1w Low</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([index, item], rowIndex) => (
            <tr
            key={index}
            className={`border-b border-gray-200 ${
              rowIndex % 2 === 1 ? "bg-gray-100" : ""
            }`}
            >
              <td className="px-4 py-2">{parseInt(index)+1}</td>
              <td className="px-4 py-2">{item.symbol}</td>
              <td className="px-4 py-2">{formatPrice(item.current_price)}</td>
              <td className={`px-4 py-2 border-l-2 border-gray-500 ${getBackgroundColor(item.ma_20, item.current_price)}`}>
                {formatPrice(item.ma_20)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.ma_20)}%)
                </span>
              </td>
              <td className={`px-4 py-2 ${getBackgroundColor(item.ma_50, item.current_price)}`}>
                {formatPrice(item.ma_50)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.ma_50)}%)
                </span>
              </td>
              <td className={`px-4 py-2 ${getBackgroundColor(item.ma_100, item.current_price)}`}>
                {formatPrice(item.ma_100)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.ma_100)}%)
                </span>
              </td>
              <td className={`px-4 py-2 ${getBackgroundColor(item.ma_200, item.current_price)}`}>
                {formatPrice(item.ma_200)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.ma_200)}%)
                </span>
              </td>
              <td className={`px-4 py-2 border-l-2 border-gray-500 ${getBackgroundColor(item.current_price, item.high_24h)}`}>
                {formatPrice(item.high_24h)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.high_24h)}%)
                </span>
              </td>
              <td className={`px-4 py-2 ${getBackgroundColor(item.current_price, item.low_24h)}`}>
                {formatPrice(item.low_24h)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.low_24h)}%)
                </span>
              </td>
              <td className={`px-4 py-2 border-l-2 border-gray-500 ${getBackgroundColor(item.current_price, item.high_1w)}`}>
                {formatPrice(item.high_1w)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.high_1w)}%)
                </span>
              </td>
              <td className={`px-4 py-2 ${getBackgroundColor(item.current_price, item.low_1w)}`}>
                {formatPrice(item.low_1w)} 
                <span className="text-xs ml-1">
                  ({calculatePercentageChange(item.current_price, item.low_1w)}%)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const getBackgroundColor = (current, value) => {
  const percentageChange = calculatePercentageChange(current, value);
  if (Math.abs(percentageChange) < 0.1) {
    return "";
  } else if (current <= value) {
    return "bg-green-200";
  } else {
    return "bg-red-200";
  }
};

const calculatePercentageChange = (current, previous) => {
  const change = ((current - previous) / previous) * 100;
  return Math.abs(change).toFixed(2);
};

const formatPrice = (price) => {
  return price.toLocaleString("en-US");
};
export default App;
