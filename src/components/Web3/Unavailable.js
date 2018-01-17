import React, { Component } from 'react'
import { Col, Card } from 'antd';
import metamaskLogo from '../../assets/metamaskLogo.png';

export default class Web3Unavailable extends Component {

    componentDidMount() {
        document.title = "MetaMask Unavailable";
    }

    render() {
        return (

            <div style={{
                background: '#ECECEC', minHeight: '100vh', minWidth: '100vh',
                paddingLeft: 50, paddingTop: 70
            }}>

                <Col offset={7} span={12}>

                    <Card title="MetaMask Not Available" bordered={false}
                        style={{ width: 500, boxShadow: "0 0 9px rgba(0,0,0,0.2)" }}>

                        Please either download Metamask
                     for your browser or unlock it if you already have it installed.
                    <br />  <br />  <br />

                        <Col offset={2}>
                            <a href="https://metamask.io">
                                <img src={metamaskLogo} style={{ width: 350 }}
                                    alt="Metamask logo" />
                            </a>
                        </Col>

                    </Card>
                </Col>
            </div>


        )
    }
}
