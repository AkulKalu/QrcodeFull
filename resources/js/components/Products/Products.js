import React, {Fragment} from 'react';
import Product from './Product';
import Panel from './ProductPanel';
import AsSwitch from '../HOC/AsSwitch'; 
import WithValidator from '../HOC/WithValidator'; 

let ProductSwitch = AsSwitch(WithValidator(Panel), Product);

export default function Products({columns, list, slice, applyFilter}) {
      let rows = list.slice(slice.start, slice.end).map((entry, i) => {
            entry = applyFilter(entry);
            if(entry) {
                entry.idx = i;
                return <ProductSwitch 
                            key={`row${i}`}
                            button = {{
                                columns : columns,
                                data : entry
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
               {rows.length ? rows : <span className="Message">Create Products</span>}
            </Fragment>
}


