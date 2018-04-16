import React, { Component } from 'react';
import BenchItem from './BenchItem';
import { Row } from 'antd';
import { Web3Provider } from 'react-web3';
import Web3Unavailable from '../../Web3/Unavailable';


export default class Bench extends Component {

    constructor() {
        super();
        this.state = {
            bench: [],
        }
    }

    componentDidMount() {
        this.setState({ bench: this.props.players });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ bench: nextProps.players });
    }

    render() {
        return (

            <Web3Provider
                web3UnavailableScreen={Web3Unavailable}
                accountUnavailableScreen={Web3Unavailable}>

                <div>

                    {/* <p className="benchCount">12 Players</p> */}
                    <Row type="flex"  >
                        {this.state.bench.map((item, index) => (
                            <BenchItem web3={this.props.web3}
                                key={index}
                                player={item} />
                        ))}
                    </Row>



                </div>

            </Web3Provider>
        )
    }
}
