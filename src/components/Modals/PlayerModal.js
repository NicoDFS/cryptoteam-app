import React, { Component } from 'react'
import { Modal, Button, InputNumber, notification } from 'antd';
import swal from 'sweetalert2';
import config from '../../config/contract';
import firebase from '../../firebase';
import { offerPlayer, buyPlayer, removeOffer, updateOffer, checkOfferAvailability } from '../../firebase/db'
import './PlayerModal.css';
let web3;

export default class PlayerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ action: nextProps.action });

        // if price card ( market page )

        if (nextProps.offerId) {
            this.setState({
                price: nextProps.price,
                offerId: nextProps.offerId,
            });
        }

        // if bench item ( bench page )

        else if (nextProps.player && nextProps.player.offer) {
            this.setState({
                offerId: nextProps.player.offer.id,
                price: nextProps.player.offer.price,
            })
        } else {
            this.setState({ price: null });
        }
    }

    componentDidMount = () => {
        web3 = this.props.web3;
        this.setState({ action: this.props.action });

        // if price card ( market page )

        if (this.props.offerId) {
            this.setState({
                price: this.props.price,
                offerId: this.props.offerId,
            });
        }

        // if bench item ( bench page )

        if (this.props.player.offer) {
            this.setState({
                offerId: this.props.player.offer.id,
                price: this.props.player.offer.price,
            })
        }
    }

    setVisible = (visibility) => {
        this.setState({ visible: visibility });
        // if (visibility && this.props.offerId) {
        //     checkOfferAvailability(this.state.offerId).then((offerIsAvailable) => {
        //         if (offerIsAvailable) {
        //             this.setState({ visible: visibility });
        //         } else {
        //             notification['error']({
        //                 message: 'This player is no longer available in the market',
        //                 duration: 3
        //             });
        //         }
        //     });
        // }
        // else {
        //     this.setState({ visible: visibility });
        // }
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

    // checks before player is transferred
    beforePurchaseConfirmation = (player, err, txHash) => {

        this.setState({
            visible: false,
            confirmLoading: false
        });

        // check if offer is still available in market
        checkOfferAvailability(this.state.offerId).then((offer) => {
            if (offer != null) {
                if (this.priceNotUpdated(offer)) {
                    if (!err) {
                        swal({
                            type: 'success',
                            title: 'Transaction Sent',
                            html: `<br/> Transaction to buy ${player.info.name} 
                    for ${this.props.price} ETH has been sent. Player will be added to your bench
                    when the transaction is confirmed.`,
                            footer: `<a href = https://etherscan.io/tx/${txHash}/> View transaction <a/>`
                        })
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
            }
            else {
                notification['error']({
                    message: 'This player is no longer available in the market',
                    duration: 3
                });

                this.setVisible(false);
            }
        });

    }

    // transfer player when the transaction is mined and confirmed
    transferPlayer = (player, txHash) => {

        buyPlayer(this.props.offerId, firebase.auth().currentUser.uid, txHash, () => {
            notification['success']({
                message: `${player.info.name} has been added to your bench.`,
                duration: 4
            });
        })
    }



    priceNotUpdated = (offer) => {
        if (offer.price !== this.state.price) {
            notification['warning']({
                message: 'This offer is now for ' + offer.price + " ETH.",
                duration: 15
            });
            this.setState({ price: offer.price });
            this.props.onUpdateOffer(this.props.index, this.state.price)
            return false;
        } else {
            return true
        }
    }

    purchase = (player) => {

        console.log("prchasing");
        this.setState({ confirmLoading: true });
        let price = web3.toWei(this.state.price, 'ether');
        let seller = this.props.seller;

        let contract = web3.eth.contract(config.abi);
        let contractInstance = contract.at(config.address);

        // check if offer is available in market

        checkOfferAvailability(this.state.offerId).then((offer) => {
            if (offer != null) {
                console.log("offer available");
                if (this.priceNotUpdated(offer)) {
                    console.log("offer is same price");
                    //buy from contract
                    if (seller === config.address) {
                        contractInstance.buyFromContract(price, {
                            from: web3.eth.accounts[0],
                            value: price
                        }, (err, txHash) => {

                            if (!err) {
                                console.log("no error");
                                this.beforePurchaseConfirmation(player, err, txHash);
                                let event = contractInstance.Buy();
                                let eventFired = false;

                                event.watch((err, res) => {

                                    if (!err && !eventFired && res.type === "mined") {
                                        // console.log(res);
                                        eventFired = true;
                                        this.transferPlayer(player, txHash);
                                    }
                                })

                            } else {
                                console.log(err);
                            }

                        })
                    }

                    // buy from another user
                    else {
                        contractInstance.buyFromUser(price, seller, {
                            from: web3.eth.accounts[0],
                            value: price
                        }, (err, txHash) => {
                            this.beforePurchaseConfirmation(player, err, txHash);
                            let event = contractInstance.Buy();
                            let eventFired = false;

                            event.watch((err, res) => {

                                if (!err && !eventFired && res.type === "mined") {
                                    // console.log(res);
                                    eventFired = true;
                                    this.transferPlayer(player, txHash);
                                }
                            })
                        })
                    }
                }
            } else {
                notification['error']({
                    message: 'This player is no longer available in the market',
                    duration: 3
                });
                this.setVisible(false);

                // Remove price card from market
                this.props.onRemoveOffer(this.props.index);

            }
        });
    }

    removeOffer = () => {

        removeOffer(this.state.offerId, firebase.auth().currentUser.uid, this.props.player.info.id);
        this.setState({ visible: false, action: "offer", offerPrice: undefined });

        // Price card
        if (this.props.offerId) {

            // Remove price card from market
            this.props.onRemoveOffer(this.props.index);
        }

        // Bench item
        else {
            this.props.onRemoveOffer();
            this.setState({ price: null });
        }


        notification['success']({
            message: 'Offer removed',
            duration: 3
        });
    }

    updateOffer = () => {
        if (!isNaN(this.state.price) && this.state.price > 0) {

            updateOffer(this.state.offerId, this.props.player.info.id,
                firebase.auth().currentUser.uid, this.state.price);

            // If price card
            if (this.props.offerId) {

                // Update price in price card
                this.props.onUpdateOffer(this.props.index, this.state.price)
            }

            this.setState({ visible: false });
            notification['success']({
                message: 'Offer updated',
                duration: 3
            });

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
                            Buy for {this.state.price} ETH
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
                    <p style={{ display: this.props.offerId ? 'block' : 'none' }} >
                        <b>Seller: </b>{this.props.seller}
                    </p>
                    <br />
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
