import '../lib/fonts';
import '../styles/site.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CommentCaMarche from '../pages/CommentCaMarche';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CommentCaMarche />
  </StrictMode>
);
