import React from 'react';
import Button from '../InputElements/Button';
import './scss/Panel.scss';

export default function Panel(props) {

    const buttons = props.buttons.map( (btn, i) => {
            return <Button key={`${props.name}Btn${i}`} className="PanelBtn" {...btn}  />
    })
    

    return  <div {...props.switchAction} className="Panel">
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

