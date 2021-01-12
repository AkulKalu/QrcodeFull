import React from 'react';
import Stat from './Stat';
import './scss/Stats.scss';

export default function Stats({show}) {

    let stats = Object.keys(show).map( (stat, i) => {
        return <Stat  key={`stat${i}`} title={stat} value={show[stat]} />
    } )
    return <div className="Stats">
        {stats}
    </div>
}