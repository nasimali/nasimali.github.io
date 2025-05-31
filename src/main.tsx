import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { loadConfigData } from '../src/lib/fetchConfig.ts';

const root = createRoot(document.getElementById('root')!);

loadConfigData()
  .then(() => {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error('Failed to load site configuration:', error);
    root.render(<div>Failed to load site configuration. Please try again later.</div>);
  });
