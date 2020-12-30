import React, {useState} from 'react';
import './scss/Navigator.scss';

export default function Navigator(props) {

    const navigate = dir => {
        if(dir === 0) {
            if(inactiveLeft === null ) {
                props.navigate({
                    start: props.position.start - 10,
                    end: props.position.end - 10,
                })
            }
           
        }else {
            if( inactiveRight === null ) {
                props.navigate({
                    start: props.position.start + 10,
                    end: props.position.end + 10,
                })
            }
        }
    }
    const navigateInput = e => {
        let val = Number(e.target.value) 
        if(e.target.name === 'start') {
            if(val > 0 ) {
                props.navigate({
                    ...props.position,
                    start : val === 1 ? 0 : val
                })
            }
           
        }else {
            if( val > 0 && val <= props.dataLength ) {
                props.navigate({
                    ...props.position,
                    end : val
                })
            }
        }
    }
    const inputOnFocus = e => {
        e.target.select();
    }
    let inactiveLeft = props.position.start === 0 ? {opacity: 0.5} : null
    let inactiveRight = props.position.end === props.dataLength ? {opacity: 0.5} : null

    return <div className="Navigator">
            <div className="BtnWrap">
                <div style={inactiveLeft} className="LeftBtn Btn" onClick={()=> navigate(0)}></div>
            </div>
            <div  className="BtnWrap">
                <div style={inactiveRight} className="RightBtn Btn" onClick={()=> navigate(1)}></div>
            </div>
            <div className="Tracker">
                <input className="TrackField" name="start" onFocus={inputOnFocus} onChange={navigateInput} type="text" value={props.position.start === 0 ? props.position.start+ 1 : props.position.start}></input><span>-</span>   
                <input className="TrackField" name="end" onFocus={inputOnFocus} onChange={navigateInput} type="text" value={props.position.end}></input>
            </div>
    </div>
}