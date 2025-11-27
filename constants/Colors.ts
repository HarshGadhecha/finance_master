const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Brand Colors (consistent across themes)
export const BrandColors = {
  primary: '#41d9a1',      // Main brand color (teal/green)
  heading: '#2571e7',      // Heading color (blue)
  blue: '#4d54e1',
  yellow: '#fec505',
  red: '#ff5668',
  cyan: '#41d5e2',
};

// Chart Colors
export const ChartColors = {
  principal: '#90dcc4',
  interest: '#fca961',
  profit: '#41d9a1',
  loss: '#ff5668',
  neutral: '#fec505',
};

export default {
  light: {
    // Basic colors
    text: '#000',
    textSecondary: '#666',
    background: '#fff',
    backgroundSecondary: '#f8f9fa',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,

    // Brand colors
    primary: BrandColors.primary,
    heading: BrandColors.heading,

    // Card colors
    cardBackground: '#fff',
    cardBorder: '#e0e0e0',
    cardShadow: 'rgba(0, 0, 0, 0.08)',

    // Input colors
    inputBackground: '#f3f5fd',
    inputBorder: '#e0e0e0',
    inputText: '#000',
    inputPlaceholder: '#999',

    // Button colors
    buttonPrimary: BrandColors.primary,
    buttonSecondary: BrandColors.heading,
    buttonText: '#fff',
    buttonDisabled: '#ccc',

    // Calculator card colors
    calculatorBlue: BrandColors.blue,
    calculatorYellow: BrandColors.yellow,
    calculatorRed: BrandColors.red,
    calculatorCyan: BrandColors.cyan,

    // Status colors
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',

    // Divider
    divider: '#e0e0e0',

    // Modal
    modalBackground: '#fff',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
  },
  dark: {
    // Basic colors
    text: '#fff',
    textSecondary: '#aaa',
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    tint: tintColorDark,
    tabIconDefault: '#666',
    tabIconSelected: tintColorDark,

    // Brand colors (slightly adjusted for dark mode readability)
    primary: '#4fffba',      // Brighter teal for dark mode
    heading: '#4d9dff',      // Brighter blue for dark mode

    // Card colors
    cardBackground: '#1e1e1e',
    cardBorder: '#333',
    cardShadow: 'rgba(0, 0, 0, 0.3)',

    // Input colors
    inputBackground: '#2a2a2a',
    inputBorder: '#444',
    inputText: '#fff',
    inputPlaceholder: '#888',

    // Button colors
    buttonPrimary: '#4fffba',
    buttonSecondary: '#4d9dff',
    buttonText: '#000',
    buttonDisabled: '#444',

    // Calculator card colors (slightly brighter for dark mode)
    calculatorBlue: '#5d64ff',
    calculatorYellow: '#ffd51f',
    calculatorRed: '#ff667a',
    calculatorCyan: '#51e5f2',

    // Status colors
    success: '#3ddc84',
    error: '#ff5252',
    warning: '#ffd740',
    info: '#40c4ff',

    // Divider
    divider: '#333',

    // Modal
    modalBackground: '#1e1e1e',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
  },
};
