import React, {useState} from 'react';
import Button from '../InputElements/Button';
import './scss/Panel.scss';

export default function Panel(props) {
    const [animation, animate] = useState({animation: 'fadeIn 0.4s forwards', onEnd: null});
    
    const close = () => {
        animate({
            animation: 'slide-out-right 0.6s forwards', 
            onEnd: props.onClose
        });
    }

    

    const buttons = props.buttons.map( (btn, i) => {
            return <Button key={`${props.name}Btn${i}`} className="PanelBtn" {...btn}  />
    })
    
    buttons.push(<Button key='CloseBtn' className="PanelBtn" name="CLOSE" onClick={close} />)

    return  <div style={animation} onAnimationEnd={animation.onEnd} className="Panel">
               <div className="Main">
                    <div className="Left" >
                        <div className="Content">
                            {props.left}
                        </div>
                    </div>
                    <div className="Right">
                        <div className="Content">
                            {props.right} 
                           
                        </div>
                        <span className="Name">{props.name}</span>
                        <div className="Control">
                            {buttons}
                        </div>
                    </div>
                   
               </div>
            </div>
}

