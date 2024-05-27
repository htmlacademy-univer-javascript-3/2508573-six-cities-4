import ReactDOM from 'react-dom/client';
import { App } from './App';
import { store } from './store/Index';
import { checkAuthAction, fetchFavoritesAction, fetchOrdersAction } from './store/ApiActions';

store.dispatch(fetchOrdersAction());
await store.dispatch(checkAuthAction());
await store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
