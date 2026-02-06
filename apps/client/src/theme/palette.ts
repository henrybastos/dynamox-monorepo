import { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { neutral, red, green, blue, yellow, skyblue, purple, indigo, brand } from './colors';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
    transparent?: {
      success: PaletteColorOptions;
      warning: PaletteColorOptions;
      error: PaletteColorOptions;
    };
    gradients?: {
      primary: PaletteColorOptions;
      secondary?: PaletteColorOptions;
    };
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    state?: string;
  }
  interface Palette {
    neutral: PaletteColor;
    gradients: {
      primary: PaletteColor;
      secondary: PaletteColor;
    };
    transparent: {
      success: PaletteColor;
      warning: PaletteColor;
      error: PaletteColor;
    };
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
    state: string;
  }
}

const palette: PaletteOptions = {
  neutral: {
    lighter: neutral[100],
    light: neutral[200],
    main: neutral[300],
    dark: neutral[400],
    darker: neutral[500],
  },
  primary: {
    light: brand.secondary.light,
    main: brand.secondary.default,
    dark: brand.secondary.dark,
  },
  secondary: {
    light: brand.accent.light,
    main: brand.accent.default,
    dark: brand.accent.dark,
  },
  success: {
    main: green[500],
    dark: green[900],
  },
  warning: {
    light: yellow[300],
    main: yellow[500],
  },
  error: {
    light: red[100],
    main: red[500],
    dark: red[900],
  },
  text: {
    primary: neutral[900],
    secondary: neutral[500],
    disabled: neutral[400],
  },
  gradients: {
    primary: {
      main: brand.secondary.dark,
      state: brand.secondary.light,
    },
    secondary: {
      main: '#FF0000',// blue[500],
      state: '#FF00FF',// skyblue[500],
    },
  },
};

export default palette;
