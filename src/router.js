import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import asyncComponent from './components/AsyncComponent'

// Pages
import HomePage from './components/HomePage/HomePage'
import PageNotFound from './components/PageNotFound/PageNotFound';
// import MarketPage from './components/MarketPage/MarketPage'
// import ProfilePage from './components/ProfilePage/ProfilePage'

// code splitting
const AsyncMarketPage = asyncComponent(() => import('./components/MarketPage/MarketPage'));
const AsyncProfilePage = asyncComponent(() => import('./components/ProfilePage/ProfilePage'));


class RouterConfig extends Component {

    render() {

        return (

            <HashRouter>
                <div className="App">

                    <Switch>

                        <Route path="//" component={HomePage} />

                        {/* Dynamic section */}
                        <Route path="/market"
                            render={() => <AsyncMarketPage web3={this.props.web3} />} />

                        <Route path="/profile"
                            render={() => <AsyncProfilePage web3={this.props.web3} />} />

                        <Route component={PageNotFound} />

                    </Switch>

                </div>
            </HashRouter>

        );
    }
}



export default RouterConfig;
