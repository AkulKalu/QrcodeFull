import React from 'react';
import './scss/Textarea.scss';

export default function Currency(props) {
    
   
    return <div className={props.wrap}>
                <label  htmlFor="description">{props.name}</label>
                <textarea className="Textarea"  {...props}></textarea>
            </div>
      
}