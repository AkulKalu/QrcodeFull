import React, {Fragment} from 'react';
import Table from '../Table/Table';
import Shippment from './Shippment';





export default function Shippments(props) {
   

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
                data= {props.list}
                row = {Shippment}
                rowProps = {{
                    columns: props.tabelColumns,
                }}
            />
    </Fragment>
}

