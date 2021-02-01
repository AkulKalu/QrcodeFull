import React, { useState } from 'react';
import Logo from '../Visual/logo';
import Loader from '../Visual/Loader';
import './scss/LoadScreen.scss';


export default function LoadScreen(props) {
    let { user, panelLoaded } = props;
    const [auth, checkAuth] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    
    const afterLoad = () => {
        sessionStorage.setItem('QrNoLoadScreen', 'true');
        setShowPanel(true);
    }

    let welcomeMessage = user.info ? <div  
                                        onAnimationEnd={afterLoad}  
                                        className="LoadMessage">
                                            <p>Hi!</p>
                                            <p>{user.info.name}</p>
                                        </div> : null

    let removeScreenAnimation = {
        animation: 'slide-out-right 0.8s ease-in both',
    }

    return <div 
                onAnimationEnd={showPanel ? panelLoaded : null} 
                style={showPanel ? removeScreenAnimation : null} 
                className="LoadScreen">
                    <div className="LogoWrap" >
                        <Logo type="LogoLoad" procede={()=> checkAuth(true)} />
                    </div>
                    {auth ?  welcomeMessage : <Loader />}
            </div>
}