import React, { Component } from 'react'
import CustomContent from '../CustomContent/CustomContent';
import './HomePage.css'
export default class PlayerPage extends Component {

    render() {
        return (
            <CustomContent content={
                <div className="banner">
                    Hello homepage
                </div>
            } />
        )
    }

}