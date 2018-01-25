import React, { Component } from 'react'
import Bench from './Bench/Bench'
import CustomContent from '../CustomContent/CustomContent'
import './ProfilePage.css'

export default class ProfilePage extends Component {
  render() {
    return (
      // <div style={{padding:0}}>
      //   <div className="header">
      //     <p>BENCH</p>
      //   </div>
      //   <Bench/>
      // </div>

      <CustomContent title="Profile"
      content={<Bench/>} />
    )
  }
}
