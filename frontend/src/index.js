import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore"

const initialState = {
  user:{},
  plan:{},
  profile:{},
  category:[],
  exerciseFormDetail:{},
  review:{},
  following:{
    following:[]
  },
  images:{images:[]}
}

const store = configureStore(initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
       <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
