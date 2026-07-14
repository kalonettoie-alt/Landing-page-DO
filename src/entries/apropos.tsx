import '../lib/fonts';
import '../styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import APropos from '../pages/APropos';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APropos />
  </StrictMode>
);
