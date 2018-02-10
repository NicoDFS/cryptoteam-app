/*
Not going to be used until a stable authentication structure 
is decided upon.
*/

import React, { Component } from 'react'
import { Col, Card, Input, Button, Form } from 'antd';
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../Web3/Unavailable';

const FormItem = Form.Item;

export default class AuthPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            address: '',
            email: '',
            buttonDisabled: true
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    componentDidMount() {
        let userAddress = this.props.web3.eth.accounts[0];
        this.setState({ address: userAddress });
        document.title = "Authentication"
    }

    handleChange(e) {
        let typedEmail = e.target.value;

        let validForm = this.state.address !== undefined && this.state.address !== ''
            && this.validateEmail(typedEmail);

        this.setState({ email: typedEmail, buttonDisabled: !validForm });
    }

    render() {
        return (

            <Web3Provider web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                <div style={{
                    background: '#ECECEC', minHeight: '100vh',
                    minWidth: '100vh', paddingLeft: 50, paddingTop: 70
                }}>

                    <Col offset={7} span={12}>

                        <Card title="Authentication"
                            style={{
                                width: 500,
                                boxShadow: "0 0 9px rgba(0,0,0,0.2)",
                                textAlign: 'left'
                            }} >

                            <Form>
                                <FormItem label="Address">
                                    <Input size="large" placeholder={this.state.address} disabled={true} />
                                </FormItem>

                                <FormItem label="Email">
                                    <Input size="large"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)} />
                                </FormItem>

                                <Button size="large" type="primary"
                                    onClick={() => this.submit()} disabled={this.state.buttonDisabled}>
                                    Submit
                                </Button>

                            </Form>


                        </Card>
                    </Col>
                </div>

            </Web3Provider>
        )
    }
}
