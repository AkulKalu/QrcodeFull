import React, {Fragment} from 'react';
import Shippment from './Shippment';
import View from '../Products/ProductView';
import AsSwitch from '../HOC/AsSwitch'; 

let Row = AsSwitch(View, Shippment);

export default function Shippments(props) {

   let {columns, list, slice, applyFilter} = props;
   
    let rows = list.map((entry, i) => {
        entry = applyFilter(entry);
        if(entry) {
            return <Row 
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
                            animate: 'fadeOut 0.3s forwards',
                        }}
                    />
        }
    })
  

    return <Fragment>
            {rows.length ? rows.slice(slice.start, slice.end) : <span className="Message">No Shippments</span>}
    </Fragment>
}

