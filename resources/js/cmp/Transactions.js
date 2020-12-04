import React, {useState, useEffect} from 'react';
import Table from './Table';
import TableHeader from './TableHeader';
import Transaction from './Transaction';
import {getTransactions} from '../Functions/server';
// import '../css/TextInput.css';

export default function Transactions(props) {
    const [transactions, setTransactions] = useState([]);
    useEffect( () => {
        getTransactions()
        .then( res => setTransactions(res.data))
    }, [])
  
    const sortTransactions = sortFun => {
        let sorted = [...transactions];
        sorted.sort(sortFun);
        setTransactions(sorted);
    }
    let tableColumns = {
        Service: {
            width: '10%',
            sort:true,
        },
        Id: {
            width: '30%',
            sort:true,
        },
        Email: {
            width: '20%',
            sort:true,
        },
        Amount : {
            width: '10%',
            sort:true,
        },
        Currency : {
            width: '15%',
            sort:true,
        },
        Status : {
            width: '15%',
            sort:true,
        }
    }
    return  <Table 
                header={<TableHeader columns={tableColumns} sort={sortTransactions} />} 
                data={transactions}
                row = {Transaction}
            />
   
}