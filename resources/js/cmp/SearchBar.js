import { filter } from 'lodash';
import React, {useState, useEffect} from 'react';
import '../css/SearchBar.css';


export default function SearchBar(props) {
    const [searchVal, setSearchVal] = useState('');
    const [searchFilters, setSearchFilters] = useState({
        id : false,
        name : true,
        manufacturee : true,
        price : false,
    });

    useEffect( () => {
        props.setFilter(searchVal.length ? searchVal.toLowerCase() : null);
    }, [searchVal])

    const filterActive = filter => {
        setSearchFilters({
            ...searchFilters,
            [filter] : !searchFilters[filter]
        })
    }
    let filters = Object.keys(searchFilters).map( (filter, i) => {
        let filterClass = searchFilters[filter] ? 'SBFilter SBFilterActive' : 'SBFilter';
        return <span onClick={()=> filterActive(filter)} className={filterClass} key={`SBFilter${i}`} >{filter}</span>
    })
    return <div className="SBContainer">
                <label htmlFor="search">search</label>
                <div className="SBWrap">
                    <input onBlur={e=> {
                      
                    }} onChange={e => setSearchVal(e.target.value)} value={searchVal} name="search" type="text" ></input>
                    <div className="SBFilters">
                       {filters}
                    </div>
                </div>
            </div>
}