import React, {useState, useEffect} from 'react';
import './scss/Search.scss';

export default function SearchBar({columns, table, search }) {
    const [searchVal, setSearchVal] = useState('');
    const [searchFilters, setSearchFilters] = useState({});
    
    useEffect( () => {
        let filters = {};
        Object.keys(columns).forEach( col => {
            let colData = columns[col]
            if( 'search' in colData) {
                filters[col] = colData.search
            }
        });

        setSearchVal('');
        setSearchFilters(filters);
        
    }, [table]);

    useEffect( () => {
        let filtersOn = Object.keys(searchFilters).reduce((acc, cur) => acc + Number(searchFilters[cur]), 0);
        search({value: searchVal.toLowerCase(), filters: filtersOn ? searchFilters : null} );
    }, [searchVal, searchFilters]);


    const filterActive = filter => {
        setSearchFilters({
            ...searchFilters,
            [filter] : !searchFilters[filter]
        })
    }
    let filters = Object.keys(searchFilters).map( (filter, i) => {
        let filterClass = searchFilters[filter] ? 'Filter Active' : 'Filter';
        return <span onClick={()=> filterActive(filter)} className={filterClass} key={`Filter${i}`} >{filter}</span>
    })

    return <div className="Search">
                <label htmlFor="search">Search</label>
                <div className="Bar">
                    <input onBlur={e=> {
                    }} onChange={e => setSearchVal(e.target.value)} value={searchVal} name="search" type="text" ></input>
                    <div className="Filters">
                       {filters}
                    </div>
                </div>
            </div>
}