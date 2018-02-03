import React, { Component } from 'react'
import './Bench.css'

export default class BenchItem extends Component {
  render() {
    return (
      <div className="benchItem cardContainer-ant">
        <img  className="benchItemPic" alt=""
        src={this.props.player.info.headshot}/>
        <p className="benchItemName" >{this.props.player.info.name}</p>
        <img  className="benchItemclub" alt=""
        src={this.props.player.club.logo}/>
      </div>
    )
  }
}
