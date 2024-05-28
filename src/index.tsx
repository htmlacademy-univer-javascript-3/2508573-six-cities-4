import ReactDOM from 'react-dom/client';
import { App } from './App';
import { store } from './store/Index';
import { checkAuthAction, fetchFavoritesAction, fetchOffersAction } from './store/ApiActions';

store.dispatch(fetchOffersAction());
await store.dispatch(checkAuthAction());
await store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
