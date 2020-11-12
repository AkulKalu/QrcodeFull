import React, {useState} from 'react';
import '../css/SearchBar.css';


export default function SearchBar(props) {
    const [searchVal, setSearchVal] = useState('');

    props.searchTable(searchVal);
    
    return <div className="SBContainer">
                <label htmlFor="search">search</label>
                <input onChange={ e => setSearchVal(e.target.value)} value={searchVal} name="search" type="text" ></input>
            </div>
}