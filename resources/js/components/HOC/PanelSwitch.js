import React, {useState, Fragment} from 'react';
import Backdrop from '../Shared/Backdrop'


export default function PanelSwitch(props) {
    const [panelOpen, openPanel] = useState(false);
    const panelSwitch = () => {
        openPanel(!panelOpen);
    }
    
    return <Fragment>
                    {< props.element {...props.elementProps} onClick={panelSwitch} />}
                {panelOpen ? <props.panel closePanel={panelSwitch} {...props.panelProps} /> : null}
            </Fragment>
}