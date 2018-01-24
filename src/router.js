import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import CustomContent from './components/CustomContent/CustomContent';

// Pages
import MarketPage from './components/MarketPage/MarketPage'
// import NavBar from './components/NavBar/NavBar'
// import PlayerPage from './components/PlayerPage/PlayerPage'
// import AuthPage from './components/AuthPage/AuthPage'
import HomePage from './components/HomePage/HomePage'


class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Route path="//" component={HomePage} />

                    <Route path="/market"
                        render={() => <MarketPage web3={this.props.web3} />} />

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;
