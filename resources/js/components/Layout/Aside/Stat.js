import React from 'react';

export default function Stat(props) {

    let { title, value } = props;
    
    return <div className="StatCont"> <div className="Stat"  >
        <div className="Value">{title}</div>
        <div className="Value">{value}</div>
    </div></div>
}