import React, { Component } from 'react'
import { Modal, Button, InputNumber } from 'antd';
import swal from 'sweetalert2';
import config from '../../config'
import firebase from '../../firebase';
import { offerPlayer, buyPlayer, removeOffer, updateOffer } from '../../firebase/db'
import './PlayerModal.css';
let web3;

export default class PlayerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount = () => {
        web3 = this.props.web3;
        this.setState({ action: this.props.action, price: this.props.price });
        if (this.props.player.offer) {
            this.setState({
                offerId: this.props.player.offer.id,
                price: this.props.player.offer.price,
            })
        }
    }

    setVisible = (visibility) => {
        this.setState({ visible: visibility });
    }


    offerPlayer = () => {
        let playerData = this.props.player;
        let sellerId = firebase.auth().currentUser.uid;

        if (!isNaN(this.state.price) && this.state.price > 0) {
            offerPlayer(playerData, sellerId, this.state.price, (offerId) => {
                this.setState({ visible: false, action: "updateOffer", offerId: offerId });
                this.props.onOfferPlayer();
            });
        } else {
            alert("Please enter a number greater than 0.");
        }
    }

    afterPurchase = (player, err, txHash) => {

        this.setState({
            visible: false,
            confirmLoading: false
        });

        if (!err) {

            //transfer player
            buyPlayer(this.props.offerId, firebase.auth().currentUser.uid, txHash, () => {

                swal({
                    type: 'success',
                    title: 'Purchase Successful',
                    html: `<br/> You have successfully bought ${player.info.name} 
                    for ${this.props.price} ETH. Player will be added to your bench
                    when the transaction is confirmed.`,
                    footer: `<a href = https://etherscan.io/tx/${txHash}/> View transaction <a/>`
                })

            });


        }

        else {

            swal({
                type: 'error',
                title: 'Oops...',
                text: `An error occurred while trying to 
                purchase this player. Please try again later`
            })

        }


    }

    purchase = (player) => {

        this.setState({ confirmLoading: true });
        let price = web3.toWei(this.state.price, 'ether');
        let seller = this.props.seller;

        let contract = web3.eth.contract(config.abi);
        let contractInstance = contract.at(config.address);

        //buy from contract
        if (seller === config.address) {
            contractInstance.buyFromContract(price, {
                from: web3.eth.accounts[0],
                value: price
            }, (err, txHash) => {
                this.afterPurchase(player, err, txHash);
            })
        }

        // buy from another user
        else {
            contractInstance.buyFromUser(price, seller, {
                from: web3.eth.accounts[0],
                value: price
            }, (err, txHash) => {
                this.afterPurchase(player, err, txHash);
            })
        }

    }

    removeOffer = () => {
        removeOffer(this.state.offerId, firebase.auth().currentUser.uid, this.props.player.info.id);
        this.setState({ visible: false, action: "offer", offerPrice: undefined });
        this.props.onRemoveOffer();
        this.setState({ price: null });
    }

    updateOffer = () => {
        if (!isNaN(this.state.price) && this.state.price > 0) {
            updateOffer(this.state.offerId, this.props.player.info.id, firebase.auth().currentUser.uid, this.state.price);
            this.setState({ visible: false });
        } else {
            alert("Please enter a number greater than 0.");
        }
    }

    updatePrice = (newPrice) => {
        this.setState({ price: newPrice });
    }


    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        return (

            <div>

                <Modal
                    className="player-modal"
                    title={this.props.player.name}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,

                        <Button style={{ display: this.state.action === "buy" ? "inline" : "none" }}
                            key="buy" type="primary"
                            onClick={() => this.purchase(this.props.player)}>
                            Buy for {this.props.price} ETH
                        </Button>,

                        <Button style={{ display: this.state.action === "offer" ? "inline" : "none" }}
                            key="offer" type="primary"
                            onClick={() => this.offerPlayer()}>
                            Offer Player
                        </Button>,

                        <Button style={{ display: this.state.action === "updateOffer" ? "inline" : "none" }}
                            key="update-offer" type="primary"
                            onClick={() => this.updateOffer()}>
                            Update Offer
                        </Button>,

                        <Button style={{ display: this.state.action === "updateOffer" ? "inline" : "none" }}
                            key="cancel-offer"
                            type="danger"
                            className="remove-button"
                            onClick={() => this.removeOffer()}>
                            Cancel Offer
                        </Button>,

                        <InputNumber min={0} key={1}
                            value={this.state.price ? this.state.price : null}
                            placeholder="ETH" onChange={this.updatePrice}
                            style={{
                                display: this.state.action === "offer" ||
                                    this.state.action === "updateOffer" ? "inline" : "none"
                            }}
                            className="price-input" />
                    ]
                    }>
                    <img draggable="false" className="headshot" src={this.props.player.info.headshot} alt="" />
                    <div className="info">
                        <p><b>First Name: </b> {this.props.player.info.firstname}</p>
                        <p><b>Last Name:  </b>{this.props.player.info.lastname}</p>
                        <p><b>Position:  </b>{this.props.player.info.position}</p>
                        <p><b>Rating: </b>{this.props.player.info.rating}</p>
                    </div>
                    {/* <PlayerCard playerInfo={this.props.player}/> */}

                </Modal >

            </div >
        )
    }
}
