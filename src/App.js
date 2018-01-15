import React, { Component } from 'react';
import MarketPage from './components/marketPage/MarketPage'
import NavBar from './components/navBar/NavBar'
import './App.css'

class App extends Component {
  render() {

    return (
      <div className="App" style={divStyle}>
          <NavBar title="cryptoteam" />
          <MarketPage/>
      </div>
    );
  }
}

const divStyle = {
  // height:window.innerHeight,
};



export default App;
