import React, { Component } from 'react'
import { Modal, Button, notification } from 'antd';
import config from '../../config'
import PlayerCard from '../PlayerCard/PlayerCard'
import { offerPlayer } from '../../firebase/db'
let web3;

export default class PlayerModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidMount = () => {
        web3 = this.props.web3;
    }

    setVisible = (visibility) => {
        this.setState({ visible: visibility });
    }

    sell = ()=> {
        let playerData = this.props.player;
        let sellerId = "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2";
        offerPlayer( playerData, sellerId, 5 , ( offerId )=> {
            this.setState({ visible: false });
        });
    }


    purchase = (player) => {

        this.setState({ confirmLoading: true });
        let price = web3.toWei(player.price, 'ether');

        web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: config.contract,
            value: price
        }, (err, txHash) => {

            this.setState({
                visible: false,
                confirmLoading: false
            });

            if (!err) {
                const args = {
                    message: 'Purchase Successful',
                    description: `You have successfully bought ${player.name} 
                    for ${ player.price} ETH.
                    Transaction hash: ${ txHash}`,
                    duration: 3,
                    style: {
                        width: 500,
                        marginLeft: -100,
                    }
                };
                notification['success'](args);
            }

            else {
                const args = {
                    message: 'Error Purchasing Player',
                    description: `An error occurred while trying to 
                purchase this player. Please try again later`,
                    duration: 3.5
                };
                notification['error'](args);
            }


        })

    }


    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        return (

            <div>

                <Modal
                    title={this.props.player.name}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,

                        <Button style={{ display: this.props.action == "buy" ? "inline" : "none" }} 
                        key="buy" type="primary"
                        onClick={() => this.purchase(this.props.player)}>
                        Buy for {this.props.price} ETH
                        </Button>,

                        <Button style={{ display: this.props.action == "sell" ? "inline" : "none" }} 
                        key="sell" type="primary"
                        onClick={() => this.sell()}>
                        Sell Player
                        </Button>
                    ]}>

                    <p><b>First Name: </b> {this.props.player.info.firstname}</p>
                    <p><b>Last Name:  </b>{this.props.player.info.lastname}</p>
                    <p><b>Position:  </b>{this.props.player.info.position}</p>
                    <p><b>Rating: </b>{this.props.player.info.rating}</p>
                    {/* <PlayerCard playerInfo={this.props.player}/> */}

                </Modal>

            </div >
        )
    }
}
