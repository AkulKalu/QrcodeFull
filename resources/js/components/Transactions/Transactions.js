import React, {Fragment} from 'react';
import Transaction from './Transaction';
import View from '../Products/ProductView';
import AsSwitch from '../HOC/AsSwitch'; 

let Row = AsSwitch(View, Transaction);


export default function Transactions(props) {
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
                            animate: 'slide-out-right 0.5s forwards',
                        }}
                    />
        }
    })
    
 
    return <Fragment>
               {rows.length ? rows.slice(slice.start, slice.end) : <span className="Message">No Transactions</span>}
            </Fragment> 
   
}