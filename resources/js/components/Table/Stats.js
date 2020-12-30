import React, {useState, Fragment} from 'react';
import Stat from './Stat';
import './scss/Stats.scss';

export default function Stats(props) {

    let stats = Object.keys(props.show).map( (stat, i) => {
        let data = props.show[stat]
        return <Stat   key={`stat${i}`} title={stat} value={data.value} />
    } )
    return <div className="Stats">
        {stats}
    </div>
}