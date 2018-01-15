import React, { Component } from 'react'
import './TabsBar.css'
import { Row } from 'antd'
import Tab from './Tab'

let tabs = [
    { 'name':'All', 'active':'false' },
    { 'name':'Auctions', 'active':'false' },
    { 'name':'For Sale', 'active':'false' },
]

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
            this.state.setState({activatedTab: tabIndex});
        }
    }

    render() {
        return (
        <Row  type="flex" justify="left" className="tabsContainer">
            {tabs.map((item, index) => (
            <Tab name ={item.name} 
                 tabsBar={this}
                 id = {index}
                 ref = {(component) => {tabs[index] = component }} />))}
        </Row>
        )
    }
}
