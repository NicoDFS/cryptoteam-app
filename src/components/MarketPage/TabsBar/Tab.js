import React, { Component } from 'react'
import './TabsBar.css'

export default class Tab extends Component {
  constructor(){
    super();
    this.state = {
      'active':false
    }
  }

  componentDidMount(){
    if(this.props.active){
      this.setState({'active':true});
    }
  }

  setActive(){
    this.setState({'active':true});
    this.props.tabsBar.activateTab(this.props.id);
  }

  setNotActive(){
    this.setState({'active':false});
  }


  render() {
    return (
      <a onClick={ ()=> this.setActive() } className={ this.state.active ? "tab active" : "tab" }>
        <p className="tabName">{this.props.name}</p>
        <div className="tabIndicator" />
      </a>
    )
  }
}
