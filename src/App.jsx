import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Scan } from 'lucide-react';
import { QRGenerator } from './components/QRGenerator';
import { QRScanner } from './components/QRScanner';
import { TabButton } from './components/TabButton';
import { AnimatedContainer } from './components/AnimatedContainer';
import { slideIn } from './utils/animations';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    slideIn(headerRef.current, 'right', 0.2);
    slideIn(contentRef.current, 'right', 0.4);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            QR Code Tool
          </h1>
          <p className="text-gray-600">Generate and scan QR codes instantly</p>
        </div>

        <AnimatedContainer className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-opacity-90">
          <div className="flex space-x-4 mb-6">
            <TabButton
              active={activeTab === 'generate'}
              icon={QrCode}
              onClick={() => setActiveTab('generate')}
            >
              Generate
            </TabButton>
            <TabButton
              active={activeTab === 'scan'}
              icon={Scan}
              onClick={() => setActiveTab('scan')}
            >
              Scan
            </TabButton>
          </div>

          <div ref={contentRef} className="flex justify-center">
            {activeTab === 'generate' ? <QRGenerator /> : <QRScanner />}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}

export default App;