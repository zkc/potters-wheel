import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store'

import './Styles/index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Provider {...{store}}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();


// future interface testing, touch/mouse combo
// const doc = document.getElementById('root')
// doc.ontouchstart = (e) => console.log(e)
