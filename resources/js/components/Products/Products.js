import React, {Fragment} from 'react';
import Product from './Product';
import Panel from './ProductPanel';
import AsSwitch from '../HOC/AsSwitch'; 
import WithValidator from '../HOC/WithValidator'; 

let ProductSwitch = AsSwitch(WithValidator(Panel), Product);
let AddProductSwitch = AsSwitch(WithValidator(Panel));

export default function Products({columns, list, slice, applyFilter, data : {updated = null, created= null}}) {

      let markRow = product => {
          let markup = {};
          if(updated && updated.id === product.id) markup.backgroundColor = 'yellow';
          if(created && created.id === product.id) markup.backgroundColor = 'green';
          if(!Number(product.active)) markup.opacity = '0.6';
          return markup;
      }

      let rows = list.slice(slice.start, slice.end).map((entry, i) => {
            entry = applyFilter(entry);
            if(entry) { 
                entry.idx = i;
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
               {rows.length ? rows : <span className="Message">Create Products</span>}
            </Fragment>
}




export function AddProduct() {

    return <AddProductSwitch 
                button = {{
                    name: 'add product',
                    className: 'AddProduct',
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


