import React, { Component } from 'react'
import PlayerCard from '../PlayerCard/PlayerCard';
import { CometSpinLoader } from 'react-css-loaders';
import { getPlayer, getMarket } from '../../firebase/db';
import { forOwn, startCase } from 'lodash';
import { Row, Col, Card } from 'antd';


export default class PlayerPage extends Component {

    constructor(props) {
        super(props)
        this.state = { player: {}, loaded: false }
    }


    componentDidMount() {

        //getting first player from market to test
        getMarket().then((marketData) => {
            let player = marketData[0]
            this.setState({ 'player': player, loaded: true });
            document.title = startCase(player.name.toLowerCase());
        });
    }

    render() {
        return (

            <div style={{
                background: '#ECECEC', minHeight: '100vh', minWidth: '100vh',
                paddingLeft: 50, paddingTop: 70
            }}>

                <CometSpinLoader color="#68cc9c" size={50}
                    style={{ display: !this.state.loaded ? 'block' : 'none' }} />

                <div style={{ display: this.state.loaded ? 'block' : 'none' }}>

                    <Row type="flex">

                        <Col span={6}>
                            <PlayerCard playerInfo={this.state.player} />
                        </Col>

                        <Col span={4}>

                            <Card title="Stats" style={{ width: 700, boxShadow: "0 0 1px rgba(0,0,0,0.2)" }}>
                                <p>{this.state.player.name}</p>
                                <p>{this.state.player.position}</p>
                            </Card>

                            <br />

                            <Card title="Other Info" style={{ width: 700, boxShadow: "0 0 1px rgba(0,0,0,0.2)" }}>
                                <p>{this.state.player.name}</p>
                                <p>{this.state.player.position}</p>
                            </Card>


                        </Col>

                    </Row>

                </div>


            </div >
        )
    }
}
