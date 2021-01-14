import React  from 'react';
import './scss/Backdrop.scss';

export default function View({close, children}) {

    const backdropClose = e => {
        if(e.target.id === 'backdrop') {
            close()
        }
    }
        
    return <div 
                onClick={backdropClose} 
                id="backdrop" 
                className="Backdrop"
                >
                    {children}
            </div>;
      
}