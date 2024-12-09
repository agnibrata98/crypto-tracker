import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CryptoContext from './CryptoContext.jsx'
import 'react-alice-carousel/lib/alice-carousel.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CryptoContext>
        <App />
      </CryptoContext>
    </QueryClientProvider>
  </StrictMode>,
)
