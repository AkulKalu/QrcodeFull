import React from 'react';

export default function Stat(props) {
    let { children, text, ...rest } = props;
    let textWrap = <div className="Text">
      {text}
    </div>
    return <div 
              className="Cell"
              {...rest}
            >
              {text ? textWrap : children}
            </div>
}