import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

// Pages
import MarketPage from './components/MarketPage/MarketPage'
import NavBar from './components/NavBar/NavBar'
import PlayerPage from './components/PlayerPage/PlayerPage'
import AuthPage from './components/AuthPage/AuthPage'
import HomePage from './components/HomePage/HomePage'
import ProfilePage from './components/ProfilePage/ProfilePage'


class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    {/* Static section */}
                    <div>
                        <NavBar title="Cryptoteam" />
                    </div>

                    {/* Dynamic section */}
                    <div>

                        <Route path="//" component={HomePage} />

                        <Route path="/market"
                            render={() => <MarketPage web3={this.props.web3} />} />

                        <Route path="/profile"
                            render={() => <ProfilePage web3={this.props.web3} />} />

                        <Route path="/player" component={PlayerPage} />

                    </div>

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;
