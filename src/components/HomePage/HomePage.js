import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import CustomContent from '../CustomContent/CustomContent';
import './HomePage.css'
export default class PlayerPage extends Component {

    render() {
        return (
            <CustomContent
                footerHidden={true}
                content={

                    <Row type="flex" justify="center" style={{ width: window.innerWidth - 100, }}>

                        <Col>

                            <Card style={{
                                width: 530, boxShadow: "0 0 3px rgba(0,0,0,0.2)", textAlign: "left",
                                marginTop: 50, marginBottom: 20, marginLeft: 30
                            }}
                                title="Trading is Live - 21/5/2018"
                                cover={<img alt="cover" src="https://img.apmcdn.org/a469f0356c05a433a4eae580fd6be68184291fc1/uncropped/8f9491-20160804-usbankstadium-soccer-11.jpg" />}
                            >

                                The market is now filled with players from the Premier League, Serie A, La Liga and Ligue 1. We
                                have added some of the players ourselves to jumpstart the game.

                        <br /> <br />

                            We won't be adding any more players once these are bought and we may decide to remove some players from 
                            the market in the future if they aren't being traded. You can also get your hands on players by buying packs which will
                            be added to the website very soon. 
                               
                                <br /> <br />
                                Happy Trading!
                                <br /><br />
                                -CryptoTeam devs

                    </Card>

                            <Card style={{
                                width: 530, boxShadow: "0 0 3px rgba(0,0,0,0.2)", textAlign: "left",
                                marginTop: 50, marginBottom: 20, marginLeft: 30
                            }}
                                title="CryptoTeam Has Launched! - 20/5/2018"
                                cover={<img alt="cover" src="https://www.wallpaperup.com/uploads/wallpapers/2014/01/24/236781/ec0863d44ae28207397f823809930e48.jpg" />}
                            >

                                CryptoTeam has officially launched with v1.0.
                            You can now buy and sell players and arrange them on your bench.
                            Within the coming days, we're going to add buying packs and games/leagues
                            will be added soon after. Check the roadmap for more details!

                        <br /> <br />

                                Please be careful when changing your account on MetaMask because you may
                            see a few inconsistencies. You may see players another account owns or not see ones
                            that you own. We are working on fixing this.

                        <br /> <br />
                                -CryptoTeam devs

                    </Card>

                        </Col>
                    </Row>





                } />
        )
    }

}
