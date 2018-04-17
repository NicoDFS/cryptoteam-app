import React, { Component } from 'react';
import { Col, Card } from 'antd';
import CustomContent from '../CustomContent/CustomContent'
import eth_logo from '../../assets/eth_logo.png';


export default class NetworkUnavailable extends Component {


    render() {
        return (

            <CustomContent content={

                <div style={{
                    minHeight: '100vh', minWidth: '100vh',
                    paddingLeft: 10, paddingTop: 70
                }}>

                    <Col offset={7} span={12}>

                        <Card title="Test Network Detected" bordered={false}
                            style={{ width: 500, boxShadow: "0 0 9px rgba(0,0,0,0.2)" }}>

                            Please switch to the mainnet Ethereum network to continue using
                            CryptoTeam.
                    <br />  <br />  <br />

                            <Col offset={1}>
                                <img src={eth_logo} style={{ width: 100, height: 100 }}
                                    alt="Ethereum logo" />
                            </Col>


                        </Card>
                    </Col>
                </div>

            } />
        )
    }
};
