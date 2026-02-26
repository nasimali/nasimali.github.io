import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { loadConfigData } from '@/lib/fetchConfig';

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
    root.render(
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6 text-center">
        <div>
          <p className="font-display text-2xl text-foreground">Unable to load site content.</p>
          <p className="mt-3 text-sm text-muted-foreground">Please refresh or try again later.</p>
        </div>
      </div>
    );
  });
