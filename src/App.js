import React, { Component } from 'react';
import PlayerCard from './Components/PlayerCard/'
import { Container, Row } from 'react-grid-system';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App" style={divStyle}>
        <Container>
          <Row className="show-grid">
            <PlayerCard  
              name='Neymar Jr.' 
              price='0.4 Eth' 
              photo='https://www.footyrenders.com/render/Neymar-35-301x540.png'
            />            
            <PlayerCard  
              name='Lionel Messi' 
              price='0.4 Eth' 
              photo='https://www.footyrenders.com/render/Lionel-Messi-27-335x540.png'
            />
            <PlayerCard  
              name='M.Salah' 
              price='0.4 Eth' 
              photo='https://www.footyrenders.com/render/Mohamed-Salah-9-317x540.png'
            />
            <PlayerCard  
              name='Paul Pogba' 
              price='0.4 Eth' 
              photo='https://www.footyrenders.com/render/paul_pogba_by_igorband-dbjjbpo-386x540.png'
            />                                 
          </Row>
        </Container>
      </div>
    );
  }
}

const divStyle = {
  height:window.innerHeight,
  paddingTop: 200,
};



export default App;
