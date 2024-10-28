import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketProvider } from '/src/context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <SocketProvider>
    <App />
  </SocketProvider>
  
)
