import React, { useState } from 'react';
import Navigator from '../Table/Navigator';
import TableHeader from '../Table/TableHeader';
import PanelSwitch from '../HOC/PanelSwitch';
import './scss/Table.scss';

export default function Table(props) {
    const [slice, setSlice] = useState({
        start: 0,
        end: 10
    })
    const applyFilter = entryData => {
        
        if(!props.filter || !props.filter.applyTo) {
            return entryData
        }
      
        const highlight = (colVal, match) => <span>
            <span style={{backgroundColor: 'gold'}}>{match}</span>
            <span>{colVal.substr(props.filter.search.length)}</span>
        </span>
       
        for (const col in props.filter.applyTo) {
           
            if(props.filter.applyTo[col]) {
                let dataKey = props.columns[col].dataKey;
                const colValue = isNaN(entryData[dataKey]) ? entryData[dataKey]: entryData[dataKey].toString();
                const match = colValue.substr(0, props.filter.search.length);
                
                if(match.toLowerCase() === props.filter.search) {
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
                return props.panel ?  <PanelSwitch  
                            key={`TableEntry${i}`}
                            panel = {props.panel} 
                            panelProps = {{...props.panelProps, data :entry}}
                            element = {props.row}
                            elementProps = {{...props.rowProps, data :entry}}
                            >
                        </PanelSwitch> :
                        <props.row  key={`TableEntry${i}`} {...props.rowProps} data={entry} />
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