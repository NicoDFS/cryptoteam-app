import React, { Component } from 'react'
import HomeContent from './HomeContent'
import CustomContent from '../CustomContent/CustomContent';

export default class PlayerPage extends Component {

    render() {
        return (
            <CustomContent title="Home" content={<HomeContent />} />
        )
    }

}