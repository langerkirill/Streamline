import React from "react";
import ReactDOM from "react-dom";
import Root from './components/Root';
import configureStore from "./store/store";
import {fetchUsers, createUser} from './actions/user_actions';
import {login, signup, logout} from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
  // We only create the store when this event fires
  let store;
  if (window.currentUser) {
    const preloadedState = {
      session: {
        id: window.currentUser.id
      },
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser
        }
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
