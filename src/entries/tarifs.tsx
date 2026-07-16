import '../lib/fonts';
import '../styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Tarifs from '../pages/Tarifs';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tarifs />
  </StrictMode>
);
