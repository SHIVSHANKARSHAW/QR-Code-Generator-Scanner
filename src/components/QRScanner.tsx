import  { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ExternalLink } from 'lucide-react';

export function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

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

  const isValidUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

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
    <div className="w-full max-w-md">
      {!scanResult && <div id="reader" className="w-full text-white"></div>}
      
      {scanResult && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-black ">Scan Result:</h3>
          <p className="break-all">{scanResult}</p>
          
          {isValidUrl(scanResult) && (
            <a
              href={scanResult}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex font-semibold  items-center text-blue-600 hover:text-blue-800"
            >
              Open Link <ExternalLink size={16} className="ml-1" />
            </a>
          )}
          
          <button
            onClick={resetScanner}
            className="mt-4 w-full font-semibold  bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Scan Another Code
          </button>
        </div>
      )}
    </div>
  );
}