import React, { useState, useRef, useEffect } from 'react';
import { Download, Settings } from 'lucide-react';
import { generateQRCode, downloadQRCode, defaultOptions } from '../utils/qrCode';
import { QRCustomizer } from './QRCustomizer';
import { scaleIn } from '../utils/animations';

export function QRGenerator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const qrImageRef = useRef(null);

  useEffect(() => {
    if (qrUrl && qrImageRef.current) {
      scaleIn(qrImageRef.current);
    }
  }, [qrUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text) {
      const url = await generateQRCode(text, options);
      if (url) setQrUrl(url);
    }
  };

  const handleOptionsChange = async (newOptions) => {
    setOptions(newOptions);
    if (text && qrUrl) {
      const url = await generateQRCode(text, newOptions);
      if (url) setQrUrl(url);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-md text-white font-semibold">
            Enter text or URL
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 caret-sky-400 block w-full rounded-md outline-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2 transition-all duration-200"
            placeholder="Enter text to generate QR code"

          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 font-semibold  text-white py-2 px-4 rounded-md outline-none hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Generate QR Code
          </button>
          <button
            type="button"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="outline-none p-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Settings size={20} />
          </button>
        </div>
      </form>

      {showCustomizer && (
        <div className="mt-4">
          <QRCustomizer options={options} onChange={handleOptionsChange} />
        </div>
      )}

      {qrUrl && (
        <div className="mt-6 flex flex-col items-center">
          <div ref={qrImageRef}>
            <img src={qrUrl} alt="QR Code" className="mb-4 rounded-lg shadow-md" />
          </div>
          <button
            onClick={() => downloadQRCode(qrUrl)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-105"
          >
            <Download size={20} />
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}