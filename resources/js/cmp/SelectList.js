import React from 'react';
import '../css/SelectList.css';

export default function SelectList(props) {
 
    return (
        <div style={props.GroupStyle} className="FormGroup ">
            
             <label className="SettingsMenuLabel" htmlFor={props.name}>{props.name}:</label>
             <div>
             <select onChange={props.select} style={props.storeMenu ? {fontWeight: '700'} : null } className="SLSelect" name={props.name} >
                    {props.storeMenu ? <option style={{fontWeight: '700'}} value="0">Create</option> : null}
                    {props.options}
                </select>
             </div>
                
         </div>)
   
}