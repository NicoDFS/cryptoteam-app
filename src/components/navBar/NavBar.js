import React, { Component } from 'react'
import './NavBar.css'
export default class NavBar extends Component {
  render() {
    return (
      <div className="navBar">
        <p className="logo">{this.props.title}</p>      
      </div>
    )
  }
}
