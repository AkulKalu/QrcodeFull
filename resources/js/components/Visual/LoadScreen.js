import React, {useState} from 'react';
import Logo from './logo';
import './scss/LoadScreen.scss';


export default function LoadScreen(props) {
    const [user, checkUser] = useState(false);
    const [loadPanel, setLoadPanel] = useState(false);

    let welcome = props.user ? <div onAnimationEnd={()=> setLoadPanel(true)} className="LoadMessage">
                    <p>Welcome</p>
                    <p>{props.user.name}</p>
                  </div> : null
    let removeScreen = {
        animation: 'slide-out-right 0.8s ease-in both',
    }
    return <div 
                onAnimationEnd={loadPanel ? props.panelLoaded : null} 
                style={loadPanel ? removeScreen : null} 
                className="LoadScreen">
                    <div className="LogoWrap" >
                        <Logo type="LogoLoad" procede={()=> checkUser(true)} />
                        {user ?  welcome : null}
                    </div>
            </div>
}