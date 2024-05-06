import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Offers } from './mocks/Offers';
import { Comments } from './mocks/Reviews';
import { store } from './store/Index';
import { fetchOrdersAction } from './store/ApiActions';

store.dispatch(fetchOrdersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App offers={Offers} reviews={Comments} />);
