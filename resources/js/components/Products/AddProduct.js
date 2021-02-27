import React from 'react';
import Panel from './ProductPanel';
import AsSwitch from '../HOC/AsSwitch'; 

function Button(props) {
    return <div {...props} className="TableControl">
        <div className="Name"  >ADD</div>
    </div> 
}

let AddProductSwitch = AsSwitch(Panel, Button);

export default function AddProduct() {

    return <AddProductSwitch 
              
                view = {{
                    add:true
                }}
                atOpen = {{
                    animate: 'fadeIn 0.3s forwards'
                }}
                atClose = {{
                    animate: 'slide-out-right 0.5s forwards',
                }}
        />
}