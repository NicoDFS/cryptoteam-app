import React, { Component } from 'react'
import { Card, Modal, Button } from 'antd';
import PlayerCard from '../PlayerCard/PlayerCard'
import { forOwn } from 'lodash';
import PlayerModal from '../PlayerModal/PlayerModal'
import SuccessModal from './Modals/SuccessModal'
import config from '../../config'
import './PriceCard.css';

let web3;

export default class PriceCard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      error: '',
      player: {},
      txHash: ''
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  purchase = (player) => {

    this.setState({
      confirmLoading: true,
    });

    let web3 = this.props.web3;
    let price = web3.toWei(player.price, 'ether');

    web3.eth.sendTransaction({
      from: web3.eth.accounts[0],
      to: config.contract,
      value: price
    }, (err, txHash) => {

      this.setState({
        visible: false,
        confirmLoading: false,
        error: err,
        txHash: txHash,
        player: player
      });



    })


  }

  openModal = () => {
    this.setState({ visible: true })
  }


  render() {

    let feedbackModal = null;

    if (this.state.txHash && !this.state.err) {
      feedbackModal = <SuccessModal player={this.state.player}
        txHash={this.state.txHash} />
    }

    if (this.state.err && !this.state.txHash) {

    }


    return (

      <div>
        <a onClick={() => this.openModal()}>
          <Card className="cardContainer-ant">
            <PlayerCard playerInfo={this.props.playerInfo} /> <br />
            <p className="price" >{this.props.playerInfo.price} ETH</p>
          </Card>
        </a>

        <PlayerModal player={this.props.playerInfo}
          visible={this.state.visible}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading} />

        {/* <Modal
          title={this.props.playerInfo.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.confirmLoading}
          footer={[

            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,

            <Button key="submit" type="primary"
              onClick={() => this.purchase(this.props.playerInfo)}>
              Buy for {this.props.playerInfo.price} ETH
            </Button>
          ]}
        >
          <p><b>First Name: </b> {this.props.playerInfo.firstName}</p>
          <p><b>Last Name:  </b>{this.props.playerInfo.lastName}</p>
          <p><b>Position:  </b>{this.props.playerInfo.position}</p>
          <p><b>Rating: </b>{this.props.playerInfo.rating}</p>

        </Modal> */}

      </div>
    )
  }
}
