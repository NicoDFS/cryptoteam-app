import React, { Component } from 'react';
import MarketPage from './components/marketPage/MarketPage'
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App" style={divStyle}>
          <MarketPage/>
      </div>
    );
  }
}

const divStyle = {
  // height:window.innerHeight,
};



export default App;
