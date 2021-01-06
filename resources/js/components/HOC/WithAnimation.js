import React, {useState} from 'react';


export default function WithAnimation(Cmp) {
    
    return function AnimatedComponent(props) {
        const [animation, animate] = useState(props.onEnter);
        const onExit = () => {
            animate(props.onExit)
        }
        return <Cmp  animation={animation}   {...props} />
    }
}