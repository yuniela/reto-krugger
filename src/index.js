import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import "./index.css"
import AppRouter from './routes/AppRouter';
import { store } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

