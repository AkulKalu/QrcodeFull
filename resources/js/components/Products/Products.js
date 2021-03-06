import React, {Fragment} from 'react';
import Product from './Product';
import Panel from './ProductPanel';
import AsSwitch from '../HOC/AsSwitch'; 

let ProductSwitch = AsSwitch(Panel, Product);


export default function Products(props) {
    let { columns, list, slice, applyFilter, data : {updated = null, created= null} } = props;

    let markRow = product => {
        let markup = {};
        if(created && created.id === product.id) markup.backgroundColor = '#94f03957';
        if(!Number(product.active)) markup.opacity = '0.6';
        return markup;
    }
   

    let rows = list.map((entry, i) => {
        entry = applyFilter(entry);
        if(entry) { 
            return <ProductSwitch 
                        key={`row${i}`}
                        button = {{
                            columns : columns,
                            data : entry,
                            style: markRow(entry)
                        }}
                        view = {{
                            data: entry
                        }}
                        atOpen = {{
                            animate: 'fadeIn 0.3s forwards'
                        }}
                        atClose = {{
                            animate: 'slide-out-right 0.5s forwards',
                        }}
                    />
            }
    })
  
    
    return <Fragment>
               {rows.length ? rows.slice(slice.start, slice.end) : <span className="Message">Create Products</span>}
            </Fragment>
}




