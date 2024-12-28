import React, { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { isValidUrl } from '../utils/url';
import { fadeIn } from '../utils/animations';

export function QRResult({ result, onReset }) {
  const resultRef = useRef(null);

  useEffect(() => {
    fadeIn(resultRef.current);
  }, []);

  return (
    <div ref={resultRef} className="mt-4 p-4 bg-white rounded-lg shadow transition-all duration-200">
      <h3 className="text-lg font-semibold mb-2">Scan Result:</h3>
      <p className="break-all">{result}</p>
      
      {isValidUrl(result) && (
        <a
          href={result}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-200 hover:scale-105"
        >
          Open Link <ExternalLink size={16} className="ml-1" />
        </a>
      )}
      
      <button
        onClick={onReset}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Scan Another Code
      </button>
    </div>
  );
}