import React from 'react';
import { Provider }from 'react-redux';
import App from './App';
import { HashRouter, Route, NavLink } from 'react-router-dom';

export default ({store}) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
