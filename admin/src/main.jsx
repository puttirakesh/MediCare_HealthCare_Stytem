import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = 'pk_test_c291Z2h0LWxhbWItNi5jbGVyay5hY2NvdW50cy5kZXYk' || process.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing publishable key. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.');
}

createRoot(document.getElementById('root')).render(
<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ClerkProvider>
)
