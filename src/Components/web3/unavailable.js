import React, { Component } from 'react'
import { Layout, Col } from 'antd';
const { Content } = Layout;

export default class Web3Unavailable extends Component {
    render() {
        return (
            <Col span={12} offset={6}>

                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#ff', padding: 24, minHeight: 280 }}>
                        <b>MetaMask Not Available or Not Unlocked</b>
                        <br /> <br /> <br />
                        Please either download Metamask
                        for your browser or unlock it if you already have it installed. See:
                        <a href="https://metamask.io"> https://metamask.io </a>
                        for more details.
                    </div>
                </Content>

            </Col>
        )
    }
}
