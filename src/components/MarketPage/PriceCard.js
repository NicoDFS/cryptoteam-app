import React, { Component } from 'react'
import PlayerCard from '../PlayerCard/PlayerCard'
import './PriceCard.css';

export default class PriceCard extends Component {
  render() {
    return (
      <div className="cardContainer">
        <PlayerCard playerInfo={this.props.playerInfo} />
        <p className="price" >{this.props.playerInfo.price} ETH</p>
      </div>
    )
  }
}
