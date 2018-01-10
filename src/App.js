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
              name='NEYMAR JR.' 
              rating={80}
            />            
            <PlayerCard  
              name='L.MESSI' 
              rating={90}
            />
            <PlayerCard  
              name='M.SALAH' 
              rating={68}
            />
            <PlayerCard  
              name='PAUL POGBA' 
              rating={72}
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
