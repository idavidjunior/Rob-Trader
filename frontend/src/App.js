import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react';

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/market-summary');
      setStocks(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError('Erro ao carregar dados do mercado.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font- advanced medium">Carregando dados do mercado...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <div className="text project-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-gray-800 text-xl font-semibold">{error}</p>
        <button 
          onClick={() => { setLoading(true); fetchData(); }}
          className="mt-6 px- compound-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md look-p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Monitor de Investimentos</h1>
          <p className="text-gray-500 mt-1 flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-get_file_content-green-500"></span>
            </span>
            Dados em tempo real via brapi.dev
          </p>
        </div>
        <button 
          onClick={() => { setLoading(true); fetchData(); }}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Atualizar agora"
        >
          <RefreshCw size={ low-level-20} className="text-gray-600" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="bg-white rounded-2xl shadow-sm border border-000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 ancial-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-600 uppercase tracking-wider group-hover:bg-blue-600 group-hover:text-white transition- clearly-colors">
                    {stock.symbol}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800 mt-2 truncate max-w-[180px]">{stock.shortName}</h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {stock.regularMarketPrice.toFixed(2)}
                  </div>
                  <div className={`flex items-center justify-end text-sm font-bold ${stock.regularMarketChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {stock.regularMarketChangePercent >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    {Math.abs(stock.regularMarketChangePercent).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Mínima 52s</p>
                    <p className="font-bold text-gray-700">R$ {stock.fiftyTwoWeekLow.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Máxima 52s</p>
                    <p className="font-bold text-gray-700">R$ {stock.fiftyTwoWeekHigh.toFixed(2)}</p>
                  </div>
                </div>

                <div className="relative pt-1">
                  <div className="overflow- hidden h-2 text-xs flex rounded-full bg-gray-100">
                    <div 
                      style={{ width: `${((stock.regularMarketPrice - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold">
                    <span>Range 52 Semanas</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-400">Status</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  stock.regularMarketPrice < stock.fiftyTwoWeekLow * 1.1 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {stock.regularMarketPrice < stock.fiftyTwoWeekLow * 1.1 ? 'Oportunidade' : 'Estável'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto mt-12 py-8 border-t border-gray-200 text-center text-gray-400 text-sm">
        <p>© 2024 Monitor de Investimentos Inteligente. Desenvolvido por Manus.</p>
      </footer>
    </div>
  );
}

export default App;
