import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../frontend/store/AuthContex'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
