import React, { useState } from 'react';
import Navigator from '../Table/Navigator';
import TableHeader from '../Table/TableHeader';
import './scss/Table.scss';

export default function Table({display, search}) {
    const [slice, setSlice] = useState({
        start: 0,
        end: 10
    })
    const [sort, setSort] = useState({fun: list => list});
    const {list, columns, Component, controls} = display

    const applyFilter = entryData => {
        const {value, filters} = search
        if(!value.length || !filters) {
            return entryData
        }
      
        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(value.length)}</span>
        </span>
       
        for (const col in filters) {
            if(filters[col]) {
                let dataKey = columns[col].dataKey;
                const colValue = isNaN(entryData[dataKey]) ? entryData[dataKey]: entryData[dataKey].toString();
                const match = colValue.substr(0, value.length);
                
                if(match.toLowerCase() === value) {
                    let filtered = {...entryData};
                    filtered[dataKey] = highlight(colValue, match)
                    return filtered;
                }
            }
        }
        
        return false
    }
    

    display = {
        ...display,
        list: [...display.data.list].sort(sort.fun),
        applyFilter : applyFilter,
        slice: slice
    }
    
    let controllButtons = controls.map((Ctrl, i) => <Ctrl key={`ctrl${i}`} />)

    return <div className="TableWrap">
                <div className="Nav">
                    <Navigator dataLength = {display.data.list.length} position={slice} navigate={setSlice} />
                    <div className="Controls">
                       {controllButtons}
                    </div>
                </div>
                <TableHeader columns={columns}  setSort={setSort} />
                <div className="Table">
                    <Component {...display} />
                </div>
            </div>
}