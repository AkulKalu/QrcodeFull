import React  from 'react';
import './scss/Toggle.scss';

export default function Toggle(props) {

    let toggleOn = {
        transform: ' translateX(100%)',
        backgroundColor: 'rgb(4, 161, 4)'
    }

    return <div 
                data-escape 
                onClick={props.onToggle} 
                className="Toggle">
                <div 
                    data-escape 
                    style={ props.on ? toggleOn : null} 
                    className="Switch">
                </div>
            </div>
      
}