import React from 'react';
import '../css/ControlPanel.css';

export default function Backdrop(props) {

    return <div id="CPBackdrop" onClick={props.closeSwitch} className="Backdrop">
       {props.children}
    </div>
      
}