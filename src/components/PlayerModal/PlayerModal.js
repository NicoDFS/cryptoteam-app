import React, { Component } from 'react'
import { Modal, Button } from 'antd';


export default class PlayerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount = () => {
        this.setState({ visible: this.props.visible });
    }

    handleOk = (e) => {

        this.setState({
            visible: false,
        });
    }
    handleCancel = () => {
        console.log('yeyeyey!');
        this.setState({
            visible: false,
        });
    }

    render() {
        return (

            <div>

                <Modal
                    title={this.props.player.name}
                    visible={this.state.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,

                        <Button key="submit" type="primary"
                            onClick={() => this.purchase(this.props.player)}>
                            Buy for {this.props.player.price} ETH
                    </Button>
                    ]}
                >
                    <p><b>First Name: </b> {this.props.player.firstName}</p>
                    <p><b>Last Name:  </b>{this.props.player.lastName}</p>
                    <p><b>Position:  </b>{this.props.player.position}</p>
                    <p><b>Rating: </b>{this.props.player.rating}</p>

                </Modal>

            </div >
        )
    }
}
