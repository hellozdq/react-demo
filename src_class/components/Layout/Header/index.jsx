import React, { Component } from 'react'
import HeaderAdmin from './HeaderAdmin'
import HeaderTab from './HeaderTab'

export default class Header extends Component {
    render() {
        return (
            <>
                <HeaderAdmin></HeaderAdmin>
                <HeaderTab></HeaderTab>
            </>
        )
    }
}
