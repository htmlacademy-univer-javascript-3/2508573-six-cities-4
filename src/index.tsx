import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Offers } from './mocks/Offers';
import { Comments } from './mocks/Reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App offers={Offers} reviews={Comments}/>
);
