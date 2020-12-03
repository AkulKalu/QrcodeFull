import React from 'react';

import '../css/Table.css';

export default function Table(props) {
   
    const applyFilter = entryData => {
        
        if(!props.filter || !props.filter.applyTo) {
            return entryData
        }
       
        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(props.filter.search.length)}</span>
        </span>

        for (const key in props.filter.applyTo) {
            if (props.filter.applyTo[key]) {
                const colValue = isNaN(entryData[key]) ? entryData[key]: entryData[key].toString();
                const match = colValue.substr(0, props.filter.search.length);
            
                if(match.toLowerCase() === props.filter.search) {
                    let filtered = {...entryData};
                    filtered[key] = highlight(colValue, match)
                    return filtered;
                }
            }
        }  

        return false
    }
   
    let tableData = props.data.map((entry, i)=> {
            entry = applyFilter(entry);
            if(entry) {
                entry.index = i;
                return <props.row  key={`entryData${i}`} {...props.rowProps}  />
            }
        })
    
 
    return <div className="TBCont">
                {props.header}
                <div className="TBTable">
                    {tableData.length ? tableData : <span>Add Products</span>}
                </div>
            </div>
}