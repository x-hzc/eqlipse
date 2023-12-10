import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Config, DAppProvider } from '@usedapp/core';
import { environment } from './environments/environment';
import App from './app/app';

const config: Config = {
  readOnlyChainId: environment.readOnlyChainId,
  readOnlyUrls: environment.readOnlyUrls,
  multicallVersion: 2,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </StrictMode>
);
