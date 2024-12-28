import { useState, useEffect } from 'react';
import { QrCode, Scan } from 'lucide-react';
import { QRGenerator } from './components/QRGenerator';
import { QRScanner } from './components/QRScanner';
import bg from './assets/bg.mp4';

function App() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 transition-opacity duration-500 ease-in-out">
          <div className="loader"></div>
        </div>
      )}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover -z-50"
      >
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-semibold text-white mb-2 mt-12" id="heading">
            QR Playground
          </h1>
          <p className="text-white font-semibold mt-4">Generate and scan QR codes instantly</p>
        </div>
        <div className="bg-transparent backdrop-blur-lg rounded-xl shadow-lg p-8 mt-16 sm:mt-0 sm:p-16 sm:px-24">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'generate'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <QrCode size={20} />
              Generate
            </button>
            <button
              onClick={() => setActiveTab('scan')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ${
                activeTab === 'scan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Scan size={20} />
              Scan
            </button>
          </div>
          <div className="flex justify-center">
            {activeTab === 'generate' ? <QRGenerator /> : <QRScanner />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;