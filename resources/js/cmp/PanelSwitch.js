import React, {useState, Fragment} from 'react';
import Backdrop from './Backdrop'


export default function PanelSwitch(props) {
    const [panelOpen, openPanel] = useState(false);
    const panelSwitch = e => {
        if(e) {
            if(!e.target.getAttribute('data-escape')) {
                openPanel(!panelOpen);
            }
            return;
        }
        openPanel(!panelOpen);
    }
    
    return <Fragment>
                <div onClick={panelSwitch} >
                    {props.children}
                </div>

                {panelOpen ? 
                    <Backdrop closePanel={panelSwitch}>
                        <props.panel closePanel={panelSwitch} {...props.panelProps} />
                    </Backdrop> : null}
            </Fragment>
}