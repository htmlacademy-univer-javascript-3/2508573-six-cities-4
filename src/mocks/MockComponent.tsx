import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

export function withHistory(component: JSX.Element) {
  return (
    <MemoryRouter>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </MemoryRouter>
  );
};
