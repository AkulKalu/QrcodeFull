import React, {useState, useEffect} from 'react';
import Logo from './logo';
import Loader from './Loader';
import './scss/LoadScreen.scss';


export default function LoadScreen(props) {
    const [user, checkUser] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    
    const afterLoad = () => {
        sessionStorage.setItem('QrNoLoadScreen', 'true');
        setShowPanel(true);
    }
    let welcome = props.user.info ? <div  onAnimationEnd={afterLoad}  className="LoadMessage">
                    <p>Hi!</p>
                    <p>{props.user.info.name}</p>
                  </div> : null
    let removeScreen = {
        animation: 'slide-out-right 0.8s ease-in both',
    }
    return <div 
                onAnimationEnd={showPanel ? props.panelLoaded : null} 
                style={showPanel ? removeScreen : null} 
                className="LoadScreen">
                    <div className="LogoWrap" >
                        <Logo type="LogoLoad" procede={()=> checkUser(true)} />
                    </div>
                    {user ?  welcome : <Loader />}
            </div>
}