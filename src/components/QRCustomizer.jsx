import React from 'react';
import { ColorPicker } from './ColorPicker';
import { qrStyles } from '../utils/qrCode';

export function QRCustomizer({ options, onChange }) {
  const handleStyleChange = (style) => {
    const newStyle = qrStyles[style];
    onChange({
      ...options,
      style,
      darkColor: newStyle.darkColor,
      lightColor: newStyle.lightColor,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
      <h3 className="font-medium text-gray-900">Customize QR Code</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Style Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(qrStyles).map((style) => (
              <button
                key={style}
                onClick={() => handleStyleChange(style)}
                className={`p-2 rounded-md text-sm capitalize transition-all duration-200 transform hover:-translate-y-0.5 ${
                  options.style === style
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Foreground Color"
            value={options.darkColor}
            onChange={(color) => onChange({ ...options, darkColor: color })}
          />
          <ColorPicker
            label="Background Color"
            value={options.lightColor}
            onChange={(color) => onChange({ ...options, lightColor: color })}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Size (px)
          </label>
          <input
            type="range"
            min="100"
            max="500"
            value={options.width}
            onChange={(e) => onChange({ ...options, width: Number(e.target.value) })}
            className="w-full accent-blue-600"
          />
          <div className="text-sm text-gray-500 text-right">{options.width}px</div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Error Correction Level
          </label>
          <select
            value={options.errorCorrectionLevel}
            onChange={(e) => onChange({ ...options, errorCorrectionLevel: e.target.value })}
            className="w-full p-2 border rounded-md bg-white transition-all duration-200 hover:border-blue-500"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}