import React, { Component } from 'react';
import MarketPage from './Components/MarketPage/MarketPage'
import NavBar from './Components/NavBar/NavBar'
import Web3Test from './test/testweb3';
import './App.css'
import 'antd/dist/antd.css';

class App extends Component {

  render() {

    return (
      <div className="App">
        <NavBar title="cryptoteam" />
        <MarketPage />
      </div>
      // <Web3Test web3={this.props.web3} />
    );
  }
}



export default App;
