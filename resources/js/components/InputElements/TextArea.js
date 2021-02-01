import React from 'react';
import './scss/Textarea.scss';

export default function Currency(props) {
    let {wrap, name} = props;
   
    return <div className={wrap}>
                <label  htmlFor="description">{name}</label>
                <textarea className="Textarea"  {...props}></textarea>
            </div>
      
}