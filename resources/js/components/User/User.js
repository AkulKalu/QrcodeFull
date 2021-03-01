import React, {useContext, useState} from 'react';
import {store} from '../HOC/StateProvider';
import './scss/User.scss';

export default function User(props) {
    const {state, dispatch} = useContext(store);
    const [hover, setHover] = useState(0);

    const exit = () => {
        dispatch.user.logout()
    }
    
    return <div className="UserMenu">
                <div className="Circles">
                    <div style={{animationDelay: '0.5s'}} className="Circle"></div>
                    <div style={{animationDelay: '1s'}} className="Circle"></div>
                    <div style={{animationDelay: '1.5s'}} className="Circle"></div>
                </div>
                <div onMouseEnter = {()=> setHover(1)}  onMouseLeave = {()=> setHover(0)} className="Name">
                    {hover ? <span className="Logout" onClick={exit}>logut</span> : <span className="Logout">{state.user.info.name}</span>}
                </div>
            </div>
}