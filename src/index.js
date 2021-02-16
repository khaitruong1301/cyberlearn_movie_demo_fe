import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
//CONFIG REDUX
import { Provider } from 'react-redux';
import { rootReducer } from './redux/reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as signalR from '@aspnet/signalr';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const connection = new signalR.HubConnectionBuilder().withUrl("http://svcy2.myclass.vn/DatVeHub" ).configureLogging(signalR.LogLevel.Information).build();


// connection.start().then(function () {
//   console.log("connected");
//   connection.invoke("loadListSeat");
// }).catch(function (err) {
//   return console.error(err.toString());
// });


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
