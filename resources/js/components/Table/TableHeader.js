import React, {useState, useEffect} from 'react';
import './scss/TableHeader.scss';



export default function TableHeader(props) {
    let {columns, setSort} = props;
    let columnNames = Object.keys(columns);
    const [ascending , setAscending ] = useState();
    const [activeSort , setActiveSort ] = useState();

    useEffect(() => {
        setAscending(Object.fromEntries(columnNames.map( name => [columns[name].dataKey, true])));
        setActiveSort(false)
    }, [columns])

    const sortBy = rule => {
        let sortFun = undefined;
       
        if(ascending[rule]) {
            sortFun = (a, b) => {
                a = a[rule] ? a[rule]: 0 ;
                b = b[rule] ?  b[rule]: 0 ;
                if(!isNaN(a) && !isNaN(b)) {
                    return a - b;
                    
                }else {
                    return String(a).localeCompare(String(b));
                }
                
            } 
        }else {
            sortFun = (a, b) => {
                a = a[rule];
                b = b[rule];
                if(!isNaN(a) && !isNaN(b)) {
                    return b - a;
                    
                }else {
                    return String(b).localeCompare(String(a));
                }
            } 
        } 
        setActiveSort([rule, ascending[rule]]);
        setAscending({...ascending, [rule] : !ascending[rule] });
       
       
        setSort({fun:sortFun});
    }

    let columnHeads = columnNames.map( (name, i) => {
        let column = columns[name];
       
        return  <div 
                    key={`TBC${i}`}
                    onClick={ column.sort ? ()=> sortBy(column.dataKey) : null} 
                    style={{width: column.width}} 
                    className="Cell">
                    {name}
                    {(activeSort && activeSort[0] === column.dataKey ) && <div className={activeSort[1] ? "ArrowDown":"Arrow" }>▲</div>}
                </div>
    } )
    return <div className="TableHeader">
                {columnHeads}
            </div>
}

