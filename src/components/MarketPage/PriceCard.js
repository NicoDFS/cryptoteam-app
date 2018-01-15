import React, { Component } from 'react'
import PlayerCard from '../playerCard/PlayerCard'
import './PriceCard.css';

export default class componentName extends Component {
  render() {
    return (
      <div className="cardContainer">
        <PlayerCard playerInfo={this.props.playerInfo} />
        <p className="price" >{this.props.playerInfo.price} ETH</p>
      </div>
    )
  }
}
