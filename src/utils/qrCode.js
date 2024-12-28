import QRCode from 'qrcode';

export const qrStyles = {
  default: {
    darkColor: '#000000',
    lightColor: '#ffffff',
  },
  anime: {
    darkColor: '#FF69B4', // Pink
    lightColor: '#F0F8FF', // Light blue
    dotScale: 0.8,
  },
  kawaii: {
    darkColor: '#9B6BFF', // Purple
    lightColor: '#FFE4E1', // Misty rose
    dotScale: 1,
  },
  cyberpunk: {
    darkColor: '#00FF00', // Neon green
    lightColor: '#000000', // Black
    dotScale: 0.9,
  },
  pastel: {
    darkColor: '#FFB6C1', // Light pink
    lightColor: '#E6E6FA', // Lavender
    dotScale: 0.7,
  }
};

export const defaultOptions = {
  width: 300,
  margin: 2,
  style: 'default',
  darkColor: '#000000',
  lightColor: '#ffffff',
  errorCorrectionLevel: 'M'
};

export const generateQRCode = async (text, options = defaultOptions) => {
  try {
    const style = qrStyles[options.style] || qrStyles.default;
    return await QRCode.toDataURL(text, {
      width: options.width,
      margin: options.margin,
      color: {
        dark: options.darkColor || style.darkColor,
        light: options.lightColor || style.lightColor,
      },
      errorCorrectionLevel: options.errorCorrectionLevel,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const downloadQRCode = (qrUrl) => {
  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = qrUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};