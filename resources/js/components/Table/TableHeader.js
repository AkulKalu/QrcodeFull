import React, {useState} from 'react';
import './scss/TableHeader.scss';



export default function TableHeader({columns, setSort}) {

    let columnNames = Object.keys(columns);
    const [ascending , setAscending ] = useState(Object.fromEntries(columnNames.map( name => [name.toLowerCase(), true])));

    const sortBy = rule => {
        let sortFun = undefined;
        if(ascending[rule]) {
            sortFun = (a, b) => {
                if(isNaN(a[rule])) {
                    return a[rule].localeCompare(b[rule]);
                }
                return a[rule] - b[rule];
            } 
        }else {
            sortFun = (a, b) => {
                if(isNaN(a[rule])) {
                    return b[rule].localeCompare(a[rule]);
                }
                return b[rule] - a[rule];
            } 
        } 
    
        setAscending({...ascending, [rule] : !ascending[rule] });
       
        setSort({fun:sortFun});
    }

    let columnHeads = columnNames.map( (name, i) => {
        let column = columns[name];
        return  <div 
                    key={`TBC${i}`}
                    onClick={ column.sort ? ()=> sortBy(name.toLowerCase()) : null} 
                    style={{width: column.width}} 
                    className="Cell">
                    {name}
                </div>
    } )
    return <div className="TableHeader">
                {columnHeads}
            </div>
}

