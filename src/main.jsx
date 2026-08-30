import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomCursor />
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
