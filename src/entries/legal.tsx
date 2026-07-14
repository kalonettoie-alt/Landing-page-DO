import '../lib/fonts';
import '../styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Legal from '../pages/Legal';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Legal />
  </StrictMode>
);
