import React, {useState, useEffect, Fragment} from 'react';
import Table from '../Table/Table';
import {getShippments} from '../../Functions/server';
import Shippment from './Shippment';
// import './css/Store.css';




export default function Shippments(props) {
    const [shippments, setShippments] = useState([{
        name: 'Jogn Doe',
        city: 'San Hose',
        country: 'US',
        state: 'LA',
        postal_code : '31230',
        line1: 'Main Street',
        shipped: 1,
        updated_at: '13-07-1990'

    }]);

    const sortShippments = sortFun => {
        let sorted = [...shippments];
        sorted.sort(sortFun);
        setShippments(sorted);
    }
  

    return <Fragment>
            <Table 
                message = "No Shipments"
                sort = {sortShippments}
                columns = {props.tabelColumns}
                filter= {props.filter}
                data= {shippments}
                row = {Shippment}
                rowProps = {{
                    columns: props.tabelColumns,
                }}
            />
    </Fragment>
}

