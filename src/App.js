import React, { Component } from 'react';
import MarketPage from './components/MarketPage/MarketPage'
import NavBar from './components/NavBar/NavBar'
// import './App.css'
import Web3Test from './Components/web3/testweb3';
import 'antd/dist/antd.css';

class App extends Component {

  render() {

    return (
      {/*<div className="App" style={divStyle}>
        <NavBar title="cryptoteam" />
        <MarketPage />
      </div>*/}
      <Web3Test web3={this.props.web3} />
    );
  }
}

const divStyle = {
  // height:window.innerHeight,
};



export default App;
