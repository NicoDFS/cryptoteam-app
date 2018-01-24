/*
Automatically formats component to fit 
next to sidebar.
*/

import React, { Component } from 'react';
import { Layout, Col } from 'antd';
import './CustomContent.css';
const { Header, Content } = Layout;

export default class CustomContent extends Component {

    render() {

        let header = null;

        //only render a title if one was passed as a prop
        if (this.props.title) {
            header = <Header className="custom-content-navbar">
                <p className="custom-content-logo">{this.props.title}</p>
            </Header>
        }

        return (
            <Layout className="custom-layout">

                {header}

                <Content className="custom-content">
                    {this.props.content}
                </Content>

            </Layout >
        )
    }
}
