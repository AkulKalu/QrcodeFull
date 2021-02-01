import React from 'react';

export default function Navigator(props) {
    let { navigate, position, dataLength } = props;
    
    const navigateInput = e => {
        let val = Number(e.target.value) 
        if(e.target.name === 'start') {
            if(val > 0 ) {
                navigate({
                    ...position,
                    start : val === 1 ? 0 : val
                })
            }
           
        }else {
            if( val > 0 && val <= dataLength ) {
                navigate({
                    ...position,
                    end : val
                })
            }
        }
    }
    const inputOnFocus = e => {
        e.target.select();
    }
    
    
    return  <div className="Tracker">
                <input className="TrackField" 
                    name="start" 
                    onFocus={inputOnFocus} 
                    onChange={navigateInput} 
                    type="text" 
                    value={position.start === 0 ? position.start+ 1 : position.start}>
                </input>
                    <span>-</span>   
                <input 
                    className="TrackField" 
                    name="end" 
                    onFocus={inputOnFocus} 
                    onChange={navigateInput} 
                    type="text" 
                    value={position.end}>
                </input>
            </div>
 
}