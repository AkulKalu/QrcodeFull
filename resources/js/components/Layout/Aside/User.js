import React, {useContext, useState} from 'react';
import {store} from '../../HOC/StateProvider';
import './scss/User.scss';

export default function User(props) {
    const {state, dispatch} = useContext(store);
    const [hover, setHover] = useState(0);

    const exit = () => {
        dispatch.user.logout()
    }
    
    return <div className="UserMenu">
                <div onMouseEnter = {()=> setHover(1)}  onMouseLeave = {()=> setHover(0)} className="Name">
                    {hover ? <span className="Logout" onClick={exit}>logut</span> : <div className="User">{state.user.info.name}</div>}
                </div>
            </div>
}