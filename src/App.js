import React, { Component } from 'react';
import Web3Test from './components/Web3/testweb3';
import 'antd/dist/antd.css';
// import './App.css';

class App extends Component {

  render() {
    return (
      <Web3Test web3={this.props.web3} />
    );
  }
}

export default App;
