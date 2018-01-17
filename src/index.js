import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Web3Init from './scripts/web3';

const web3Instance = Web3Init();
ReactDOM.render(<App web3={web3Instance} />, document.getElementById('root'));
registerServiceWorker();