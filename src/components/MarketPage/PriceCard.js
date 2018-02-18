import React, { Component } from 'react'
import { Card } from 'antd';
import PlayerCard from '../PlayerCard/PlayerCard'
import PlayerModal from '../Modals/PlayerModal'
import './PriceCard.css';

export default class PriceCard extends Component {

  openModal = () => {
    this.refs.playerModal.setVisible(true);
  }

  render() {
    return (

      <div>

        <a onClick={() => this.openModal()}>
          <Card style={{ opacity: this.props.owned ? 0.4 : 1 }} className="cardContainer-ant">
            <PlayerCard playerInfo={this.props.playerInfo} /> <br />
            <p className="price" >{this.props.price} ETH</p>
          </Card>
        </a>

        <PlayerModal web3={this.props.web3}
          player={this.props.playerInfo}
          seller={this.props.seller}
          price={this.props.price}
          offerId={this.props.offerId}
          action={this.props.owned ? "updateOffer" : "buy"}
          onRemoveOffer={() => console.log("")}
          ref='playerModal' />

      </div>
    )
  }
}
