import React, { Component } from 'react'
import { Card } from 'antd';
import PlayerCard from '../PlayerCard/PlayerCard'
import './PriceCard.css';


export default class PriceCard extends Component {

  handleClick() {
    let playerInfo = this.props.playerInfo;
    // console.log(playerInfo);

    // Route to PlayerPage

  }

  render() {
    return (
      <div onClick={() => this.handleClick()}>
        <Card className="cardContainer-ant">
          <PlayerCard playerInfo={this.props.playerInfo} /> <br />
          <p className="price" >{this.props.playerInfo.price} ETH</p>
        </Card>
      </div>
    )
  }
}
