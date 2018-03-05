import React, { Component } from 'react'
// import { Layout, Menu, Icon, Affix } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, HashRouter } from 'react-router-dom'
import './Navigator.css';
// const { Sider } = Layout;

export default class Navigator extends Component {

    constructor(props) {
        super(props)
        this.state = { collapsed: true, tabsFloat: 'left' }
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
                {/* <Sider
                    // collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    style={{ fontWeight: 100 }}
                > */}

                <HashRouter>
                    {/* <Affix> */}
                    <Menu theme="dark" mode="horizontal" style={{ backgroundColor: '#111' }} defaultSelectedKeys={['1']}>

                        <Menu.Item key="1" style={{ float: this.state.tabsFloat }}>
                            {/* <Icon type="home" /> */}
                            <span>Home</span>
                            <Link to="/" />
                        </Menu.Item>

                        <Menu.Item key="2" style={{ float: this.state.tabsFloat }}>
                            {/* <Icon type="wallet" /> */}
                            <span>Marketplace</span>
                            <Link to="/market" />
                        </Menu.Item>

                        <Menu.Item key="3" style={{ float: this.state.tabsFloat }}>
                            {/* <Icon type="skin" /> */}
                            <span>Bench</span>
                            <Link to="/profile" />
                        </Menu.Item>

                        <Menu.Item key="5" style={{ float: this.state.tabsFloat }}>
                            {/* <Icon type="trophy" /> */}
                            <span>Leagues (coming soon!)</span>
                        </Menu.Item>

                        <Menu.Item key="4" style={{ float: this.state.tabsFloat }}>
                            {/* <Icon type="pushpin-o" /> */}
                            <span>Roadmap</span>
                            <Link to="/roadmap" />
                        </Menu.Item>

                        <Menu.Item key="6" style={{ float: this.state.tabsFloat }}>
                            <a style={{ display: 'inline' }} href="https://discord.gg/CPwmU6C"
                                target="_blank"
                                rel="noopener noreferrer">
                                {/* <i className="fab fa-discord fa-lg"></i> */}
                            </a>
                            <span>Contact Us</span>
                        </Menu.Item>

                    </Menu>
                    {/* </Affix> */}
                </HashRouter>
                {/* </Sider> */}
                {this.props.children}
            </Layout>
        );
    }
}
