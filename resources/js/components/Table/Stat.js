import React from 'react';

export default function Stat(props) {
    
    
    return <div className="StatCont"> <div className="Stat"  >
        <div className="Value">{props.title}</div>
        <div className="Value">{props.value}</div>
    </div></div>
}