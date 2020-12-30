import React, {useState, useEffect, Fragment} from 'react';
import Table from '../Table/Table';
import Transaction from './Transaction';
import {getTransactions} from '../../Functions/server';
// import '../css/TextInput.css';

export default function Transactions(props) {
    const [transactions, setTransactions] = useState([{
        service: 'paypal',
        transaction_id: '151a6d51a6d1as',
        customer_id: 'asdasdad',
        customer_email: 'asdasd@.gabu.com',
        amount: '500',
        currency: 'USD',
        status:'completed',
        created_at: '2020-12-14 15:55:22'
    }]);
    // useEffect( () => {
    //     getTransactions()
    //     .then( res => setTransactions(res.data))
    // }, [])
  
    const sortTransactions = sortFun => {
        let sorted = [...transactions];
        sorted.sort(sortFun);
        setTransactions(sorted);
    }
   
 
    return <Fragment>
                <Table 
                    message = 'No Transactions'
                    sort = {sortTransactions}
                    columns={props.tabelColumns}
                    filter= {props.filter}
                    data={transactions}
                    row = {Transaction}
                    rowProps = {{
                        columns: props.tabelColumns,
                    }}
                    
                    
                />
            </Fragment> 
   
}