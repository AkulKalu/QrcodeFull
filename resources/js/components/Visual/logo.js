import React from 'react';
import ReactDOM from 'react-dom';
import QRLogo from '../../storage/SQCLogo.svg';
import './scss/Logo.scss';


export default function Logo(props) {

    return <div className = "Logo">
    <div style={props.style} className={props.type}>
                <img className="LogoImg" src={QRLogo} alt="LogoCode"  />
                <div className="LogoText">
                     <span >Simple</span>
                     <span> QrCodes</span>
                    <div onAnimationEnd={props.procede} className="LogoBar"></div>
                </div>
        </div>
</div>            
}

if (document.getElementById('mainLogo')) {
    ReactDOM.render(<Logo type="LogoLoad"/>, document.getElementById('mainLogo'));
}

