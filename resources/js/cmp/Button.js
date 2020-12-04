import React from 'react';
import '../css/buttons.css';
export default function Button(props) {
    return  <button 
                {...props}
                type="button">
                {props.name}
            </button>
}