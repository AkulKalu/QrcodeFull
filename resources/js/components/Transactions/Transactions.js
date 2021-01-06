import React, {Fragment} from 'react';
import Table from '../Table/Table';
import Transaction from './Transaction';


export default function Transactions(props) {
   
  
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
                    data={props.list}
                    row = {Transaction}
                    rowProps = {{
                        columns: props.tabelColumns,
                    }}
                    
                    
                />
            </Fragment> 
   
}