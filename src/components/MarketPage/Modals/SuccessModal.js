import React, { Component } from 'react'
import { Modal } from 'antd';


export default class SuccessModal extends Component {
    render() {
        return (
            <Modal.success title='Purchase Successful'
                content={`You have successfully bought ${this.props.player.name} for ${this.props.player.price} ETH. 
          Transaction hash: ${this.props.txHash}`} />
        )
    }
}
