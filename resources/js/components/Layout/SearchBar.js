import React, {useState, useEffect, useContext} from 'react';
import './scss/Search.scss';
import {store} from '../HOC/StateProvider';



export default function SearchBar(props) {
    const [searchVal, setSearchVal] = useState('');
    const [searchFilters, setSearchFilters] = useState({});
    const {dispatch} = useContext(store)

    useEffect( () => {
        setSearchVal('');
        let filters = {};

        Object.keys(props.columns).forEach( col => {
            let colData = props.columns[col]
            if( 'search' in colData) {
                filters[col] = colData.search
            }
        });
        setSearchFilters(filters);
        
    }, [props.table]);

    useEffect( () => {
        let filtersOn = Object.keys(searchFilters).reduce((acc, cur) => acc + Number(searchFilters[cur]), 0);
        dispatch.search({value: searchVal.toLowerCase(), filters: filtersOn ? searchFilters : null} );
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