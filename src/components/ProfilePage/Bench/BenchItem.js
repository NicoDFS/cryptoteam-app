import React, { Component } from 'react'
import './Bench.css'
import PlayerModal from '../../Modals/PlayerModal'

let saleRibbon = require('../../../assets/saleRibbon.png');

export default class BenchItem extends Component {


  openModal = () => {
    this.refs.playerModal.setVisible(true);
  }

  render() {
    return (
      // style={{opacity: this.props.player.offer == null ? 1 : 0.4}}
      <div>
        <a>
          <div onClick={()=>this.openModal()} className="benchItem">
            <div style={{display: this.props.player.offer == null ?  "none" : "block" }} className="forSale"/>
            <img style={{display: this.props.player.offer == null ?  "none" : "block" }} src={saleRibbon} className="ribbon"/>
            <img  className="benchItemPic" alt=""
            src={this.props.player.info.headshot}/>
            <p className="benchItemName" >{this.props.player.info.name.substr(0,13)}</p>
            <img  className="benchItemclub" alt=""
            src={this.props.player.club.logo}/>
          </div>
        </a>

        <PlayerModal web3={this.props.web3}
        action="sell"
        player={this.props.player}
        ref='playerModal' />

      </div>
    )
  }
}
