import React, { Component } from 'react'
import Bench from './Bench/Bench'
import CustomContent from '../CustomContent/CustomContent'
import { getUser } from '../../firebase/db'
import './ProfilePage.css'

export default class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      bench : [],
    }
    this.getUserData("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2");
  }

  getUserData( userAddress ){
    getUser( userAddress ).then((userData) => {
      if(userData){
        var bench = [];
        // Getting players ids ( json keys )
        let playerIds = Object.keys(userData.owned);
        playerIds.forEach( (playerId , index ) => {  
          // Using players ids to retrieve players data and add them to the bench
          bench.push(userData.owned[playerId]);
          // setting bench state after getting all players data
          if( index == playerIds.length-1 ){
            this.setState({bench:bench});
          }
        });
      }
    });
  }

  render() {
    return (
      <CustomContent title="Profile"
      content={
        <Bench  web3={this.props.web3}players={this.state.bench}/>
      } />
    )
  }
}
