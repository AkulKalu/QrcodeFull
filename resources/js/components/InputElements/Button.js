import React from 'react';
import './scss/Buttons.scss';
export default function Button(props) {
    return  <button 
                {...props}
                type="button">
                {props.name}
            </button>
}