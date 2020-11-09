import React from 'react';
import Button from './Button';
import '../css/SettingsMenu.css';

export default function BasicPanel(props) {

    const buttons = props.buttons.map( (btn, i) => {
        if(btn) {
            return <Button key={`${props.name}Btn${i}`} className="SettingsBtn" {...btn}  />
        }
    })

    return  <div className="SettingsMenu">
                <h1>{props.name}</h1>

                {props.children}
            
                <div style={{margin:'2rem 0', flexDirection: "row"}} className="FormGroup">
                   {buttons}
                </div>
            </div>
}