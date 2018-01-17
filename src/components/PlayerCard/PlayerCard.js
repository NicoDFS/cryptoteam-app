import React, { Component } from 'react'
import './PlayerCard.css';

export default class PlayerCard extends Component {

  state = {
    cardType : "",
  }

  componentDidMount(){
    this.setCardType(this.props.playerInfo.rating);
  }

  componentWillReceiveProps(nextProps) {
    this.setCardType(nextProps.playerInfo.rating);
  }

  setCardType( rating ){
    switch (true) {
      case ( rating < 78 ):this.setState({ cardType :"bronze"});break;
      case ( rating >= 78 && rating < 85 ):this.setState({ cardType :"silver"});break;
      case ( rating >= 85 && rating < 93 ):this.setState({ cardType :"gold"});break;
      case ( rating >= 93 ):this.setState({ cardType :"plat"});break;
      default:break;
    }
  }
  
  render() {

    return (
      <div className={"container " + this.state.cardType } >

          <div className="leftBar">
            <p className="rating">{this.props.playerInfo.rating}</p>
            <p className="position">{this.props.playerInfo.position}</p>
            <img className="club" src={this.props.playerInfo.clubLogo} alt=""/>
            <img className="nation" src={this.props.playerInfo.nationFlag} alt=""/>
          </div>

          <div className="rightBar">
            <img className='photo' src={this.props.playerInfo.headShot} alt=""/>
            <p className="name">{this.props.playerInfo.name}</p>
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



