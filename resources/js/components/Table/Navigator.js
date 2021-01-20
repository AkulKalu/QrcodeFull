import React, {useState} from 'react';
import './scss/Navigator.scss';

export default function Navigator({navigate, position, dataLength}) {

    const navigateHandle = dir => {
        if(dir === 0) {
            if(inactiveLeft === null ) {
                navigate({
                    start: position.start - 10,
                    end: position.end - 10,
                })
            }
           
        }else {
            if( inactiveRight === null ) {
                navigate({
                    start: position.start + 10,
                    end: position.end + 10,
                })
            }
        }
    }
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
    let inactiveLeft = position.start === 0 ? {opacity: 0.5} : null
    console.log(dataLength, position.end);
    let inactiveRight = dataLength <=  position.end ? {opacity: 0.5} : null

    return <div className="Navigator">
            <div className="BtnWrap">
                <div style={inactiveLeft} className="LeftBtn Btn" onClick={()=> navigateHandle(0)}></div>
            </div>
            <div  className="BtnWrap">
                <div style={inactiveRight} className="RightBtn Btn" onClick={()=> navigateHandle(1)}></div>
            </div>
            <div className="Tracker">
                <input className="TrackField" name="start" onFocus={inputOnFocus} onChange={navigateInput} type="text" value={position.start === 0 ? position.start+ 1 : position.start}></input><span>-</span>   
                <input className="TrackField" name="end" onFocus={inputOnFocus} onChange={navigateInput} type="text" value={position.end}></input>
            </div>
    </div>
}