import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import {store} from "@/store/index.js";
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "@/styles/themeProvider.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Provider
              store={store}>
            <App />
          </Provider>
      </ThemeProvider>
  </React.StrictMode>,
)
