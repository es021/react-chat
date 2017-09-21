import React from 'react';
import ReactDOM from 'react-dom';

console.log(process.env);

/*
 if (process.env.NODE_ENV === 'test') {
 console.log("test");
 module.hot.accept();
 }
 */

// Load Main App
import App from './js/app.js';

// Load CSS
require("./css/app.css");
require("./lib/font-awesome-4.7.0/css/font-awesome.css");

const title = 'Chat Reader';

/**** MAIN ********************************************/
ReactDOM.render(<App/>, document.getElementById('app'));
