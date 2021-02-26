import React from 'react';
import Panel from './ProductPanel';
import AsSwitch from '../HOC/AsSwitch'; 

let AddProductSwitch = AsSwitch(Panel);

export default function AddProduct() {

    return <AddProductSwitch 
                button = {{
                    name: 'add product',
                    className: 'TableControl',
                }}
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