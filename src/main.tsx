import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleMapsProvider } from './components/maps/GoogleMapsProvider'
import { AuthProvider } from './hooks/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <GoogleMapsProvider>
        <App />
      </GoogleMapsProvider>
    </AuthProvider>
  </StrictMode>,
)
