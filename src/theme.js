const hexToRgba = (hex, opacity) => {
  opacity = opacity || 1;
  hex = hex.replace(/[^0-9A-F]/gi, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${[r, g, b, opacity].join(',')})`;
};

const headings = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '36px',
  xl: '43px',
  xxl: '60px',
};

/**
 * Values should be hex values and not rgb/rgba
 * https://material.io/design/color/the-color-system.html#tools-for-picking-colors
 * @type {ThemeVariant}
 */
const colors = {
  default: {
    primary: '#00242C',
    secondary: '#2dec7c',
    secondaryDark: '#1b9b5c',
    shade1: '#4d5c62',
    shade2: '#7f8b90',
    shade3: '#a5adb1',
    shade4: '#c8d0d5',
    shade5: '#dee6eb',
    shade6: '#ecf3f7',
    red: '#ff5c53',
    redDark: '#c64740',
    white: '#FFFFFF',
    blue: '#47b2fa',
    background: '#c8d0d5',
    onSurface: '#000000',
    onButton: '#FFFFFF',
    status: {
      info: {
        primary: '#91D5FF',
        secondary: '#E6F7FF',
      },
      error: {
        primary: '#F5222D',
        secondary: '#FFEBEE',
      },
      warning: {
        primary: '#FAAD14',
        secondary: '#FFF7E1',
      },
      ok: {
        primary: '#52C41A',
        secondary: '#ECF8E6;',
      },
    },
  },
};

const typography = {
  primary: {
    regular: 'Arial, sans-serif',
    semiBold: 'ArialSemiBold',
    bold: 'ArialBold',
    extraBold: 'ArialExtraBold',
    light: 'Arial, sans-serif',
  },
};

const theme = {
  colors,
  headings,
  typography,
  hexToRgba,
};

export default theme;
