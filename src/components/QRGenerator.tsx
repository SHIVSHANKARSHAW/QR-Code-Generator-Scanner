import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

export function QRGenerator() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQR = async (text: string) => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text) {
      generateQR(text);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm  text-white font-semibold">
            Enter text or URL
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 caret-sky-400  block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
            placeholder="Enter text to generate QR code"
          />
        </div>
        <button
          type="submit"
          className="w-full font-semibold  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Generate QR Code
        </button>
      </form>

      {qrUrl && (
        <div className="mt-6 flex flex-col items-center">
          <img src={qrUrl} alt="QR Code" className="mb-4" />
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Download size={20} />
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}