import React from 'react';


export default function Navigator(props) {
    let { navigate, position, dataLength, left, right } = props;

    const navigateHandle = () => {
        if(left) {
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
    
    let inactiveLeft = position.start === 0 ? {opacity: 0.5} : null
    let inactiveRight = dataLength <=  position.end ? {opacity: 0.5} : null

    return <div className="BtnWrap">
                <div 
                    style={left ? inactiveLeft : inactiveRight} 
                    className={( left ? "LeftBtn Btn" : "RightBtn Btn")} 
                    onClick={ navigateHandle }>
                </div>
            </div>
           
  
}