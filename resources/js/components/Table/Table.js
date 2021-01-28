import React, { useState, useEffect } from 'react';
import Navigator from '../Table/Navigator';
import TableHeader from '../Table/TableHeader';
import Products, {AddProduct} from '../Products/Products';
import Transactions from '../Transactions/Transactions';
import Shippments from '../Shippments/Shippments';
import './scss/Table.scss';

export default function Table(props) {
    const {display, state} = props;
    const [displaying, setDisplaying] = useState(display);
    const [slice, setSlice] = useState({
        start: 0,
        end: 10
    })
    const [sort, setSort] = useState({fun: list => list});
   
    useEffect(() => {
        setSort({fun: list => list});
        setDisplaying(display);
    }, [display])

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
    
    const tables = {
        Transactions : {
            Component: Transactions,
            data: state.user.transactions,
            columns: state.tabelColumns.Transactions,
            controls: []
        },
        Products: {
            Component: Products,
            data: state.products,
            columns: state.tabelColumns.Products,
            controls: [AddProduct]
        },
        Shippments: {
            Component: Shippments,
            data: state.user.shippments,
            columns: state.tabelColumns.Shippments,
            controls: []
        },
    }

    let {Component, data, columns} = tables[displaying];

    let renderTable = () => <Component 
                                columns={columns} 
                                data={data} 
                                list={[...data.all].sort(sort.fun)} 
                                slice={slice} 
                                applyFilter={applyFilter} />
    
    let renderControls = () => tables[displaying].controls.map((Ctrl, i) => <Ctrl key={`ctrl${i}`} />);

    return <div className="TableWrap">
                <div className="Nav">
                    <Navigator dataLength = {data.all.length} position={slice} navigate={setSlice} />
                    <div className="Controls">
                       {renderControls()}
                    </div>
                </div>
                <TableHeader columns={columns}  setSort={setSort} />
                <div className="Table">
                  {renderTable()}
                </div>
            </div>
}