/*
Automatically formats component to fit 
next to sidebar.
*/

import React, { Component } from 'react';
import { Layout } from 'antd';
import './CustomContent.css';
const { Header, Content } = Layout;

export default class CustomContent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Layout>

                <Header className="custom-content-navbar">
                    <p className="custom-content-logo">{this.props.title}</p>
                </Header>

                <Content className="custom-content">
                    {this.props.content}
                </Content>

            </Layout>
        )
    }
}
