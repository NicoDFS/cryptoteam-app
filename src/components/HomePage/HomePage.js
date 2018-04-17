import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'
import CustomContent from '../CustomContent/CustomContent';
import './HomePage.css'
export default class PlayerPage extends Component {

    render() {
        return (
            <CustomContent
                footerHidden={true}
                content={

                    <Row type="flex" justify="center" style={{ width: window.innerWidth - 100, }}>
                        <Card style={{
                            width: 530, boxShadow: "0 0 3px rgba(0,0,0,0.2)", textAlign: "left",
                            marginTop: 50, marginBottom: 20, marginLeft: 30
                        }}
                            title="CryptoTeam Has Launched! - 17/4/2018"
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

                    </Row>





                } />
        )
    }

}