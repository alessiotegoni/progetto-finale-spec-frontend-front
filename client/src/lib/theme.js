import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5C6BC0",
      light: "#8E99F3",
      dark: "#26418F",
    },
    secondary: {
      main: "#FF8A65",
      light: "#FFB59B",
      dark: "#C75B39",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    error: {
      main: "#F44336",
    },
    success: {
      main: "#4CAF50",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px 0 rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 20px 0 rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px 0 rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
