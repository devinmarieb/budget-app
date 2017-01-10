import React from 'react';
import { render } from 'react-dom';
import Application from './components/Application';
import firebase from './firebase';
import MoneyQuotes, { randomQuote } from './components/MoneyQuotes';

require('./styles/reset.css');
require('./styles/style.scss');

render(<Application quote={ randomQuote() } />, document.getElementById('application'));
