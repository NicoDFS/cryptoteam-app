import React, { Component } from 'react';
import RouterConfig from './router';
import './App.css'


class App extends Component {

  render() {

    return (
      <RouterConfig web3={this.props.web3} />
    );
  }
}



export default App;
