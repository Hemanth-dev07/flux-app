import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import { dark } from '@clerk/ui/themes'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const ThemedClerkProvider = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={isDark ? { theme: dark } : {}}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ThemedClerkProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemedClerkProvider>
  </ThemeProvider>
)