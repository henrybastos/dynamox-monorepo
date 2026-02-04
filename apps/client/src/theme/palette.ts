import { PaletteColorOptions, PaletteOptions } from '@mui/material/styles';
import { brand, gray, red, green, blue, yellow, skyblue, purple, indigo, white } from './colors';

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
    light: gray[100],
    main: indigo[500],
    dark: gray[900],
  },
  primary: {
    light: purple[300],
    main: brand.deepPlum,
  },
  secondary: {
    light: '#E4bA66',
    main: brand.industrialAmber,
    dark: '#C29E55',
  },
  info: {
    lighter: white[100],
    light: white[200],
    main: white[300],
    dark: white[400],
    darker: white[500],
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
    primary: indigo[500],
    secondary: gray[500],
    disabled: gray[200],
  },
  gradients: {
    primary: {
      main: purple[500],
      state: indigo[300],
    },
    secondary: {
      main: blue[500],
      state: skyblue[500],
    },
  },
};

export default palette;
