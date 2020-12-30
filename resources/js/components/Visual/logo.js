import React from 'react';
import QRLogo from '../../storage/SQCLogo.svg';
import './scss/Logo.scss';


export default function Logo(props) {

    return <div style={props.style} className={props.type}>
                    <img className="LogoImg" src={QRLogo} alt="LogoCode"  />
                    <div className="LogoText">
                         <span >Simple</span>
                         <span> QrCodes</span>
                        <div onAnimationEnd={props.procede} className="LogoBar"></div>
                    </div>
                </div>
           
}