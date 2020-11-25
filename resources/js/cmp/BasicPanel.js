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
                <div className="PanelLeft" >
                    {props.children}
                </div>
                <div className="PanelRight">
                   {props.preview}
                   
                </div>
            </div>
}

{/* <div className="PanelRightM">
<h1>{props.name}</h1>
<div className="PanelButtons">
    {buttons}
</div>  
</div> */}