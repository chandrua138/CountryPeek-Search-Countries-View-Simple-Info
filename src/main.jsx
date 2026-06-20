import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { FavouritesProvider } from './context/FavouritesContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </ThemeProvider>
  </StrictMode>,
)
