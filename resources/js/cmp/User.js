import React from 'react';
import {logout} from '../Functions/server';
import '../css/User.css';

export default function User(props) {

    const exit = () => {
        logout()
        .then(res => {
            window.location.replace( window.location.origin);
        })
    }

    return <div className="CPUserCtrl">
        <div className="CPUserCont">
            <span>{props.user.name}</span>
            <div className="CPUserIndicator"></div>
        </div>
        <div className="CPUserCont">
            <span onClick={exit}>SignOut</span>
        </div>
    </div>
}