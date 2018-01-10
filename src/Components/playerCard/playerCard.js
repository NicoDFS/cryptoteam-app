import React, { Component } from 'react'
import { Col } from 'antd';
import './PlayerCard.css';

let goldCard= require('../../Assets/cards/gold2.png');

export default class PlayerCard extends Component {

  state = {
    cardType : "",
  }

  componentDidMount(){
    this.setCardType(this.props.rating);
  }

  setCardType( rating ){
    switch (true) {
      case ( rating <= 70 ):this.setState({ cardType :"bronze"});break;
      case ( rating >= 70 && rating <= 80 ):this.setState({ cardType :"silver"});break;
      case ( rating > 80 && rating <= 90 ):this.setState({ cardType :"gold"});break;
    }
  }
  
  render() {

    return (

      <div className={"container " + this.state.cardType } >

          <div className="leftBar">
            <p className="rating">{this.props.rating}</p>
            <p className="position">RW</p>
            <img className="club" src="https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/clubbadges/html5/dark/24x24/l241.png" alt=""/>
            <img className="nation" src="https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/flags/html5/24x14/52.png" alt=""/>
          </div>

          <div className="rightBar">
            <img className='photo' src="https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/players/html5/134x134/158023.png" alt=""/>
            <p className="name">{this.props.name}</p>
            <div className="statsContainer">

              <div className="rightStat">
                <p className="statValue">89</p>
                <p className="statName">PAC</p>
              </div>

              <div className="leftStat">
                <p className="statValue">91</p>
                <p className="statName">DRI</p>
              </div>

              <div className="rightStat">
                <p className="statValue">78</p>
                <p className="statName">SHO</p>
              </div>

              <div className="leftStat">
                <p className="statValue">99</p>
                <p className="statName">DEF</p>
              </div>

              <div className="rightStat">
                <p className="statValue">73</p>
                <p className="statName">PAS</p>
              </div>

              <div className="leftStat">
                <p className="statValue">92</p>
                <p className="statName">PHY</p>
              </div>

            </div>
          </div>

      </div>
    )
  }
}



