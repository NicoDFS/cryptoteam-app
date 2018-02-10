import React, { Component } from 'react'
import { Layout, Menu, Icon, Affix } from 'antd';
import { Link, HashRouter } from 'react-router-dom'
import './Navigator.css';

const { Sider } = Layout;

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = { collapsed: true }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout className="layout">
                <Sider
                    // collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{ fontWeight: 100 }}
                >
                    
                    <HashRouter>
                    <Affix>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                            <Menu.Item key="1">
                                <Icon type="home" />
                                <span>Home</span>
                                <Link to="/" />
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Icon type="shopping-cart" />
                                <span>Marketplace</span>
                                <Link to="/market" />
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Icon type="idcard" />
                                <span>Profile</span>
                                <Link to="/profile" />
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Icon type="upload" />
                                <span>Other</span>
                            </Menu.Item>

                        </Menu>
                        </Affix>
                    </HashRouter>
                </Sider>
                {this.props.children}
            </Layout>
        );
    }
}
