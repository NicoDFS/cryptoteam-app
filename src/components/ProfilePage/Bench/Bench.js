import React, { Component } from 'react';
import BenchItem from './BenchItem';
import { Row } from 'antd';

export default class Bench extends Component {
    render() {
        return (
            <div>
                {/* <p className="benchCount">12 Players</p> */}
                <Row type="flex" justify="center" >
                    {this.props.players.map((item, index) => (
                        <BenchItem web3={this.props.web3}
                            key={index}
                            player={item} />
                    ))}
                </Row>
            </div>
        )
    }
}
