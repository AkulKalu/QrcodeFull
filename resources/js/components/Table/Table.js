import React, { useState , useContext} from 'react';
import Navigator from '../Table/Navigator';
import TableHeader from '../Table/TableHeader';
import PanelSwitch from '../HOC/PanelSwitch';
import {store} from '../HOC/StateProvider';
import './scss/Table.scss';

export default function Table(props) {
    const [slice, setSlice] = useState({
        start: 0,
        end: 10
    })
    const {state} = useContext(store)

    const applyFilter = entryData => {
        const {value, filters} = state.search
        if(!value.length || !filters) {
            return entryData
        }
      
        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(value.length)}</span>
        </span>
       
        for (const col in filters) {
           
            if(filters[col]) {
                let dataKey = props.columns[col].dataKey;
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
    
    let tableData = props.data.slice(slice.start, slice.end).map((entry, i) => {
            entry = applyFilter(entry);
            if(entry) {
                entry.idx = i;
                props.rowProps.view['data'] = entry;
                props.rowProps.button['data'] = entry;
                return <props.row  key={`TableEntry${i}`} {...props.rowProps} data={entry} />
            }
        })
    
    
    return <div className="TableWrap">
                <div className="Nav">
                    <Navigator dataLength = {props.data.length} position={slice} navigate={setSlice} />
                    <div className="Controls">
                       <div className="Btn">{props.controls}</div>
                    </div>
                </div>
                <TableHeader columns={props.columns}  sort={props.sort} />
                <div className="Table">
                    {tableData.length ? tableData : <span className="Message">{props.message}</span>}
                </div>
            </div>
}