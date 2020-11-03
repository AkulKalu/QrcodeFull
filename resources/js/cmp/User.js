import Axios from 'axios';
import React from 'react';
import '../css/User.css';

export default function User(props) {

    const logout = () => {
        window.axios.post('http://laravel.test/logout')
        .then(res => {
            console.log(res);
            window.location.replace( 'http://laravel.test');
        })
        .catch(err => console.log(err));
    }

    return <div className="CPUserCtrl">
        <div className="CPUserCont">
            <span>{props.user.name}</span>
            <div className="CPUserIndicator"></div>
        </div>
        <div className="CPUserCont">
            <span onClick={logout}>SignOut</span>
        </div>
    </div>
}