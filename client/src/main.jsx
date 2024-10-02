import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { store } from './Redux/store.js';
import { ThemeUIProvider } from "theme-ui";
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeUIProvider theme={theme}>
      <App />
      </ThemeUIProvider>
    </Provider>
  </React.StrictMode>,
)
