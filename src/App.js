import React, { Component } from 'react';
import RouterConfig from './router';
import Navigator from './components/Navigator';
import './App.css'


class App extends Component {

  render() {

    return (
      <Navigator children={<RouterConfig web3={this.props.web3} />} />
    );
  }
}



export default App;
