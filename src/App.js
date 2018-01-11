import React, { Component } from 'react';
import PlayerSearch from './Components/marketPage/MarketPage'
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App" style={divStyle}>
          <PlayerSearch/>
      </div>
    );
  }
}

const divStyle = {
  height:window.innerHeight,
  paddingTop: 200,
};



export default App;
