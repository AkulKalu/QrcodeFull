import React, {useState, useEffect} from 'react';
import './scss/Search.scss';


export default function SearchBar(props) {
    const [searchVal, setSearchVal] = useState('');
    const [searchFilters, setSearchFilters] = useState({});

    useEffect( () => {
        setSearchVal('');
        let filters = {};

        Object.keys(props.columns).forEach( col => {
            let colData = props.columns[col]
            if( 'search' in colData) {
                filters[col] = colData.search
            }
        });
        console.log(filters);
        setSearchFilters(filters);
        
    }, [props.table]);

    useEffect( () => {
        props.setFilter(searchVal.length ? {search: searchVal.toLowerCase(), applyTo: searchFilters} : null);
    }, [searchVal]);

    useEffect( () => {
        if(searchVal.length) {
            let filtersOn = Object.keys(searchFilters).reduce((acc, cur) => acc + Number(searchFilters[cur]), 0);
            props.setFilter({search: searchVal.toLowerCase(), applyTo: filtersOn ? searchFilters : null});
        }
    }, [searchFilters]);

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
                <label htmlFor="search">search</label>
                <div className="Bar">
                    <input onBlur={e=> {
                      
                    }} onChange={e => setSearchVal(e.target.value)} value={searchVal} name="search" type="text" ></input>
                    <div className="Filters">
                       {filters}
                    </div>
                </div>
            </div>
}