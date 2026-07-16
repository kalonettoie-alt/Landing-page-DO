import '../lib/fonts';
import '../styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DevenirOperateur from '../pages/DevenirOperateur';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DevenirOperateur />
  </StrictMode>
);
