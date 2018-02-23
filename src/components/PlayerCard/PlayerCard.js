import React, { Component } from 'react'
import './PlayerCard.css';
let truncate = require('truncate');

export default class PlayerCard extends Component {

  state = {
    cardType: "",
  }

  componentDidMount() {
    this.setCardType(this.props.playerInfo.info.rating);
  }

  componentWillReceiveProps(nextProps) {
    this.setCardType(nextProps.playerInfo.info.rating);
  }

  setCardType(rating) {
    switch (true) {
      case (rating < 78): this.setState({ cardType: "bronze" }); break;
      case (rating >= 78 && rating < 85): this.setState({ cardType: "silver" }); break;
      case (rating >= 85 && rating < 93): this.setState({ cardType: "gold" }); break;
      case (rating >= 93): this.setState({ cardType: "plat" }); break;
      default: break;
    }
  }

  render() {

    return (
      <div className={"container " + this.state.cardType} >

        <div className="leftBar">
          <p className="rating">{this.props.playerInfo.info.rating}</p>
          <p className="position">{this.props.playerInfo.info.position}</p>
          <img draggable="false" className="club" src={this.props.playerInfo.club.logo} alt="" />
          <img draggable="false" className="nation" src={this.props.playerInfo.nation.flag} alt="" />
        </div>

        <div className="rightBar">
          <img draggable="false" className='photo' src={this.props.playerInfo.info.headshot} alt="" />
          <p className="name">{truncate(this.props.playerInfo.info.name, 17)}</p>
          <div className="statsContainer">

            <div className="rightStat">
              <p className="statValue">{this.props.playerInfo.stats.dribbling}</p>
              <p className="statName">DRI</p>
            </div>

            <div className="leftStat">
              <p className="statValue">{this.props.playerInfo.stats.longpassing}</p>
              <p className="statName">PAC</p>
            </div>

            <div className="rightStat">
              <p className="statValue">{this.props.playerInfo.stats.strength}</p>
              <p className="statName">STR</p>
            </div>

            <div className="leftStat">
              <p className="statValue">{Math.ceil((this.props.playerInfo.stats.longshots +
                this.props.playerInfo.stats.shotpower) / 2)}</p>
              <p className="statName">SHO</p>
            </div>

            <div className="rightStat">
              <p className="statValue">{Math.ceil((this.props.playerInfo.stats.strength +
                this.props.playerInfo.stats.acceleration) / 2)}</p>
              <p className="statName">PHY</p>
            </div>

            <div className="leftStat">
              <p className="statValue">{Math.ceil((this.props.playerInfo.stats.longpassing +
                this.props.playerInfo.stats.shortpassing) / 2)}</p>
              <p className="statName">PAS</p>
            </div>


          </div>
        </div>

      </div>
    )
  }
}



