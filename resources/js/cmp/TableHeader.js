import React, {useState, Fragment} from 'react';
import '../css/TableHeader.css';



export default function TableHeader(props) {

    let columnNames = Object.keys(props.columns);
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
        props.sort(sortFun);
    }

    let columns = columnNames.map( (name, i) => {
        let column = props.columns[name];
        return  <div 
                    key={`TBC${i}`}
                    onClick={ column.sort ? ()=> sortBy(name.toLowerCase()) : null} 
                    style={{width: column.width}} 
                    className="TBHCell">
                    {name}
                </div>
    } )
    return <div className="TBHCont">
                {columns}
            </div>
}

