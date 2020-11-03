import React from 'react';
import Gear from '../storage/gear.svg';
import '../css/Settings.css';

export default function Settings(props) {
   
    return <div className="CPSettings">
                <img alt="Settings" onClick={props.settingsSwitch} src={Gear}></img>
            </div>
}