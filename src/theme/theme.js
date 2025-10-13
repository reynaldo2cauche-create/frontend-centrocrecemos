import { createTheme } from "@mui/material"

export const ThemePalette = {
  PURPLE_LIGHT: '#c36fbfe3',
  FONT_GLOBAL: 'Open Sans',
  PURPLE_MEDIUM: '#f3eaea',
  PURPLE_HARD: '#dcb7d5',
  WHITE: '#fff',
  BLACK_MEDIUM: '#000',
  SKYBLUE_MEDIUM: '#0496da',
  PURPLE_LIGHT_CARD: '#ca7fc6',
  RED: '#ff0000',
  FOOTER_BACKGROUND: '#caade9',
  TEXT_FOOTER: '#5e5c5c'
} 

export const DEFAULT_THEME = createTheme({
  typography: {
    fontFamily: ThemePalette.FONT_GLOBAL,
  },

  palette: {
    primary: {
      main: '#2196F3', // Azul
    },
    secondary: {
      main: '#8D288F', // Morado
    },
    success: {
      main: '#A3C644', // Verde lima
    },
    background: {
      default: '#F5F5F5', // Gris claro
      paper: '#fff',
    },
    error: {
      main: '#D32F2F', // Rojo para errores
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#8D288F',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
    },
    // Puedes agregar más overrides para el sidebar, botones, etc.
  },
})

export const FontSize = {
  PARAGRAPH: '16px',
  TITLE_SECTION: '24px',
  TITLE_SERVICE: '26px',
  TITLE_PARAGRAPH: '18px',
  TITLE_BUTTON: '16px',
  FOOTER_TITLE: '16px',
  FOOTER_TEXT: '14px',
  PROFESSION_IMAGE_STAFF: '14px',
  FORM_ERROR: '12px',
  MESSAGE_EMAIL: '13px',
  TEXT_BUTTON_AREA_INFANTIL: '12px'
}


export const theme = createTheme({
  palette: {
    primary: {
      main: '#c263f9',
    },
    secondary: {
      main: '#0d83fd',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#2d465e',
    },
  },
  typography: {
    fontFamily: '"Roboto", system-ui, -apple-system, sans-serif',
    h1: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"Nunito", sans-serif',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 50,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(194, 99, 249, 0.3)',
          },
        },
      },
    },
  },
});