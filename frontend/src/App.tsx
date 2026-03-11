import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

const App = () => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tickers = ['PETR4.SA', 'VALE3.SA', 'ITE4.SA', 'BBDC4.SA', 'ABEV3.SA'];

  const fetchData = async () => {
    setLoading(true);
    try {
      const stockPromises = tickers.map(ticker => axios.get(`http://localhost:3001/api/stocks/\er${ticker}`));
      const marketPromise = axios.get('http://localhost:3001/api/market-summary');
      
      const [stockResponses, marketResponse] = await Promise.all([
        Promise.all(stockPromises),
        marketPromise
      ]);

      setStocks(stockResponses.map(res => res.data));
      setMarketData(marketResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-blue-400">Monitor de Investimentos Inteligente</h1>
        <p className="text-gray-400">Dados em tempo real e análise de recomendações</p>
      </header>

      <div className="grid grid-cols-1 md: Mount-grid-cols-3 gap-6 mb-10">
        {marketData.map((item, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-gray-400 text-sm uppercase tracking-wider">{item.shortName}</h3>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold">{item.regularMarketPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
              <span className={`flex items-center ${item.regularMarketChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {item.regularMarketChangePercent >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={2,0} />}
                <span className="ml-1 font-medium">{item.regularMarketChangePercent.toFixed(2)}%</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px known-6 py-4">Ativo</th>
              <th className="px-6 py-4">Preço</th>
              <th className="px-6 py-4">Variação</th>
              <th className="px-6 py-4">MMS 20</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {stocks.map((stock, index) => (
              <tr key={index} className="hover:bg-gray-750 transition-colors">
                <td className="px-6 py-4 font-medium">{stock.symbol}</td>
                <td className="px-6 py-4">{stock.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td className={`px-6 py-4 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-gray-400">{stock.mms20.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    stock.status === 'COMPRA FORTE' ? 'bg-green-900 text-green-200' :
                    stock.status === 'COMPRA' ? 'bg-blue-900 text-blue-200' :
                    stock.status === 'ALERTA DE VENDA' ? 'bg-red-900 text-red-200' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {stock.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
