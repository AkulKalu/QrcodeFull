import React from 'react';
import QRLogo from '../storage/SQCLogo.svg';
import '../css/Logo.css';


export default function Logo() {

    return <div className="CPLogo">
                <div>
                    <div className="CPLogoCode">
                        <img src={QRLogo} alt="LogoCode"  />
                        <span className="CPLogoText" ><span className="CPLogoSimple">Simple</span> QrCodes</span>
                    </div>
                </div>
            </div>
}