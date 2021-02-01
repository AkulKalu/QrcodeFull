import React from 'react';
import Button from '../InputElements/Button';
import './scss/Panel.scss';

export default function Panel(props) {

    let {name, left, right, buttons, switchAction} = props;

    const control = buttons.map( (btn, i) => {
            return <Button key={`${name}Btn${i}`} className="PanelBtn" {...btn}  />
    })
    

    return  <div {...switchAction} className="Panel">
               <div className="Main">
                    <div className="Left" >
                        <div className="Content">
                            {left}
                        </div>
                    </div>
                    <div className="Right">
                        <div className="Content">
                            {right} 
                        </div>
                        <span className="Name">{name}</span>
                        <div className="Control">
                            {control}
                        </div>
                    </div>
               </div>
            </div>
}

