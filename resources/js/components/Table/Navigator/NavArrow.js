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
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 492.004 492.004"  className={( left ? "LeftBtn Btn" : "RightBtn Btn")}   style={left ? inactiveLeft : inactiveRight}  xmlSpace="preserve">
                    <g>
                        <g>
                            <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
                                c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
                                c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
                                c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>
                        </g>
                    </g>

                </svg>
            </div>
           
  
}