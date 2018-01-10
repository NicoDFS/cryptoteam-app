import React, { Component } from 'react';
import PlayerCard from './Components/playerCard/PlayerCard'
import { Row, } from 'antd';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App" style={divStyle}>
          <Row  type="flex" justify="center" >
            <PlayerCard  
              name='Neymar Jr.' 
            />            
            <PlayerCard  
              name='Lionel Messi' 
            />
            <PlayerCard  
              name='M.Salah' 
            />
            <PlayerCard  
              name='Paul Pogba' 
            />                                 
          </Row>
      </div>
    );
  }
}

const divStyle = {
  height:window.innerHeight,
  paddingTop: 200,
};



export default App;
