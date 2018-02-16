import React, { Component } from 'react'
import { Col, Card } from 'antd';
import CustomContent from '../CustomContent/CustomContent'


export default class PageNotFound extends Component {
    render() {

        const comp = <Col offset={7} span={12}>

            <Card title="Ooops! Something went wrong!"
                style={{
                    width: 500,
                    boxShadow: "0 0 9px rgba(0,0,0,0.2)",
                    textAlign: 'left'
                }} >

                If you think this is a bug on our end, please join our official Discord server
                and let us know in <a>#bug-reports. </a>
                <br /><br />

                <a href="https://discord.gg/CPwmU6C" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', justifyContent: 'center' }}>
                    <i className="fab fa-discord fa-5x"></i>
                </a>

            </Card>
        </Col>

        return (
            <CustomContent title="Page Not Found" content={comp} />
        )
    }
}
