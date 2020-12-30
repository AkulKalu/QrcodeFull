import React, {useState} from 'react';
import './scss/Backdrop.scss';

export default function Backdrop(props) {
    const [animation, animate] = useState({animation: 'fadeIn 0.4s forwards', onEnd: null});
    
    const close = () => {
        animate({
            animation: 'fadeOut 0.4s forwards', 
            onEnd: props.closePanel
        });
    }

    return <div style={animation} onAnimationEnd={animation.onEnd}  className="Backdrop">
            {props.children}
    </div>
      
}