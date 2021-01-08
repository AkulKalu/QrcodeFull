import React, {useState, Fragment, useEffect} from 'react';
import Switch from '../InputElements/Button';

export default function AsSwitch(ViewCmp, SwitchCmp=null) {
    
    return function AsSwitchComponent(props) {
        const [switchOn, toogleSwitch] = useState(false);
        const [animation, animate] = useState();

        useEffect(() => {
            if (props.on)  open();
        }, [props.on])
        
        const open = () => {
            toogleSwitch(true);
            animate({
                style: {
                    animation: props.atOpen.animate
                },
                onAnimationEnd:() => {
                    if(props.atOpen['onAnimationEnd']) props.atClose.onAnimationEnd();
                } 
            })
        }
        const close = () => {
            animate({
                style: {
                    animation: props.atClose.animate
                },
                onAnimationEnd:() => {
                    if(props.atClose['onAnimationEnd']) props.atClose.onAnimationEnd();
                    toogleSwitch(false);
                } 
            })
        }

        return <Fragment>
            {SwitchCmp ? <SwitchCmp onClick={switchOn ? close : open}  {...props.button}/> : <Switch onClick={switchOn ? close : open}  {...props.button} /> }
            {switchOn ? <ViewCmp   switchAction={animation} close={close}   {...props.view} /> : null}
        </Fragment> 
    }
}

