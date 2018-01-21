import React, { Component } from 'react'
import { Modal } from 'antd';

export default class ErrorModal extends Component {
    render() {
        return (
            <Modal.error title='Error Purchasing Player'
                content={`An error occurred while trying to 
                purchase this player. Please try again later`} />
        )
    }
}
