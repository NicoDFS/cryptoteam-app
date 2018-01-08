import React, { Component } from 'react'
import { Col } from 'react-grid-system';
import './PlayerCard.css';

export default class PlayerCard extends Component {
  
  render() {

    return (
      <Col lg={3} className='Container'>
        <div className='GreyLayer'>
          <p className='Name'> {this.props.name} </p>
          <img className='Photo' src={this.props.photo} alt=""/>
          <h2 className='Price' >{this.props.price}</h2>
        </div>
      </Col>
    )
  }
}



