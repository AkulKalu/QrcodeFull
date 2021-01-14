import React, {Fragment} from 'react';
import Shippment from './Shippment';
import View from '../Products/ProductView';
import AsSwitch from '../HOC/AsSwitch'; 

let Row = AsSwitch(View, Shippment);

export default function Shippments({columns, list, slice, applyFilter}) {
   
    let rows = list.slice(slice.start, slice.end).map((entry, i) => {
        entry = applyFilter(entry);
        if(entry) {
            entry.idx = i;
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
                            animate: 'slide-out-right 0.5s forwards',
                        }}
                    />
        }
    })
  

    return <Fragment>
            {rows.length ? rows : <span className="Message">No Shippments</span>}
    </Fragment>
}

