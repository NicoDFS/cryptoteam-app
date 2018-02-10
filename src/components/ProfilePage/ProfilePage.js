import React, { Component } from 'react'
import Bench from './Bench/Bench'
import CustomContent from '../CustomContent/CustomContent'
import { getUser } from '../../firebase/db'
import './ProfilePage.css'
import firebase from '../../firebase'

export default class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      bench: [],
    }
    this.getUserData2("1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2");
    // this.getUserData();
  }

  getUserData2(userAddress) {
    getUser(userAddress).then((userData) => {
      if (userData) {

        let bench = [];

        // Getting players ids ( json keys )
        let playerIds = Object.keys(userData.owned);

        playerIds.forEach((playerId, index) => {
          // Using players ids to retrieve players data and add them to the bench
          bench.push(userData.owned[playerId]);

          // setting bench state after getting all players data
          if (index === playerIds.length - 1) {
            this.setState({ bench: bench });
          }
        });
      }
    });
  }

  getUserData(userAddress) {

    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {

        let userAddress = user.id;

        getUser(userAddress).then((userData) => {
          if (userData) {

            let bench = [];

            // Getting players ids ( json keys )
            let playerIds = Object.keys(userData.owned);

            playerIds.forEach((playerId, index) => {
              // Using players ids to retrieve players data and add them to the bench
              bench.push(userData.owned[playerId]);

              // setting bench state after getting all players data
              if (index === playerIds.length - 1) {
                this.setState({ bench: bench });
              }
            });
          }
        });

      } else {
        // No user is signed in.
      }
    });

  }

  render() {
    return (
      <CustomContent title="Profile"
        content={
          <Bench web3={this.props.web3} players={this.state.bench} />
        } />
    )
  }
}
