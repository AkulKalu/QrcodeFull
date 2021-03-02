import React from 'react';


export default function AsideBtn(props) {
   let { className, style,  onClick, title } = props;
   
    return <div style = {style}
            className={className} 
            onClick={ onClick }>
                <div className="BtnContent">
                    <div className="Text">
                    <span>{title}</span>
                    </div>
                    
                    <div className="Indicator">
                        <div></div>
                    </div>
                </div>
             </div>
}

