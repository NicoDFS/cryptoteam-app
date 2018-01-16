import React, { Component } from 'react'
import './TabsBar.css'
import { Row } from 'antd'
import Tab from './Tab'

let tabsInfo = [
    { 'name':'Buy', 'active':'false' },
    { 'name':'Sell', 'active':'false' },
    { 'name':'Auctions', 'active':'false' },
]

let tabs = []

export default class TabsBar extends Component {

    constructor(){
        super();
        this.state = {
            "activatedTab":0, // Index of active tab
        }
    }

    componentDidMount(){
        if(this.props.activeTab){
            this.setState({'activatedTab':this.props.activeTab});
            this.activateTab(this.props.activeTab);
        }
        tabs[this.state.activatedTab].setActive();
    }

    activateTab( tabIndex ){
        if(tabIndex !== this.state.activatedTab){
            tabs[this.state.activatedTab].setNotActive();
            this.setState({activatedTab: tabIndex});
        }
    }

    render() {
        return (
        <Row  type="flex" justify="left" className="tabsContainer">
            {tabsInfo.map((item, index) => (
            <Tab key = {index} 
                 name ={item.name} 
                 tabsBar={this}
                 id = {index}
                 ref = {(component) => {tabs[index] = component }} />))}
        </Row>
        )
    }
}
