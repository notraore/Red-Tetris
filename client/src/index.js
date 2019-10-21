import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/fonts.css'
import './styles/patterns.css'
import { App } from './App.js'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<div style={{height: '100vh', backgroundColor: 'rgb(33, 35, 46)'}}><App /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
