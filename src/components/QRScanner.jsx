import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { QRResult } from './QRResult';

export function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    setScanner(newScanner);

    newScanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        newScanner.clear();
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      if (newScanner) {
        newScanner.clear();
      }
    };
  }, []);

  const resetScanner = () => {
    setScanResult(null);
    if (scanner) {
      scanner.render(
        (decodedText) => {
          setScanResult(decodedText);
          scanner.clear();
        },
        (error) => {
          console.warn(error);
        }
      );
    }
  };

  return (
    <div className="w-full max-w-md ">
      {!scanResult && <div id="reader" className="w-full text-white"></div>}
      {scanResult && <QRResult result={scanResult} onReset={resetScanner} />}
    </div>
  );
}