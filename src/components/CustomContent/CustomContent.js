/*
Automatically formats component to fit 
next to sidebar.
*/

import React, { Component } from 'react';
import { Layout } from 'antd';
import './CustomContent.css';
const { Header, Content } = Layout;

export default class CustomContent extends Component {
    constructor() {
        super();
        this.state = {
            screenWidth: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ screenWidth: window.innerWidth });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    render() {

        let header = null;

        //only render a title if one was passed as a prop
        if (this.props.title) {
            header = <Header style={{ width: this.state.screenWidth - 80 }} className="custom-content-navbar ">
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
