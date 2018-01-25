import React, { Component } from 'react'
import './Bench.css'

export default class BenchItem extends Component {
  render() {
    return (
      <div className="benchItem">
        <img  className="benchItemPic"
        src="https://fifa17.content.easports.com/fifa/fltOnlineAssets/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/items/images/players/html5/134x134/183277.png"/>
        <p className="benchItemName" >EDEN HAZARD</p>
      </div>
    )
  }
}
