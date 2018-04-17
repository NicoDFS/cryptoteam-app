import React, { Component } from 'react'
import { Card } from 'antd';

export default class NoReuslts extends Component {
    render() {
        return (
            <Card
                title="Your Bench is Empty"
                style={{
                    width: 500,
                    boxShadow: "0 0 9px rgba(0,0,0,0.2)",
                    textAlign: 'left',
                    marginTop: 50
                }} >
                Visit the <a href="/#/market" >market</a> to buy players.
                {/* <i className="fas fa-search fa-2x" style={{ marginLeft: 155 }} /> */}
            </Card>
        )
    }
}
