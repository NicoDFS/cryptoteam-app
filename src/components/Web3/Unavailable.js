import React, { Component } from 'react'
import UnavailableContent from './UnavailableContent';
import CustomContent from '../CustomContent/CustomContent'

export default class Web3Unavailable extends Component {

    render() {
        return (
            <CustomContent content={<UnavailableContent />} />
        )
    }
}
