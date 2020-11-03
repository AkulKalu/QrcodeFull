import React from 'react';
import '../css/TextInput.css';

export default function TextInput(props) {

    const name = props.name.replace(' ', '');

    return (
        <div style={props.style} className="FormGroup ">
            <label className="SettingsMenuLabel" htmlFor={name}>{props.name}</label>
                <input 
                    className="TXIInput"
                    onChange = {props.onChange}
                    value={props.value} 
                    type='text' id={name}
                    name={name}>
                </input>
         </div>)
   
}