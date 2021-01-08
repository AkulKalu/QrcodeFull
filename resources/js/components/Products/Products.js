import React, {Fragment} from 'react';
import Product from './Product';
import Panel from './ProductPanel';
import PanelSwitch from '../HOC/PanelSwitch';
import Button from '../InputElements/Button';
import Table from '../Table/Table'; 
import AsSwitch from '../HOC/AsSwitch'; 
import WithValidator from '../HOC/WithValidator'; 

let ProductSwitch = AsSwitch(WithValidator(Panel), Product);

export default function Products(props) {
    
    const sortProducts = sortFun => {
        let sorted = [...products];
        sorted.sort(sortFun);
        setProducts(sorted);
    }
  
   
    
    return <Fragment>
                <Table 
                    message = 'Add Products'
                    columns = {props.tabelColumns}
                    data={props.list}
                    sort = {sortProducts}
                    row = {ProductSwitch}
                    rowProps= {{
                        button: {
                            columns: props.tabelColumns 
                        },
                        view : { },
                        atOpen : {
                            animate: 'fadeIn 0.3s forwards'
                        },
                        atClose : {
                            animate: 'slide-out-right 0.5s forwards',
                        }
                    }}
                   
                    controls = { <PanelSwitch 
                        panel={Panel} 
                        panelProps={{
                            create: true,
                        }}
                        element= {Button}
                        elementProps = {{
                            name: 'Add Product',
                            className: 'ProductsAddBtn'
                        }}
                        >
                    </PanelSwitch>}
                />
            </Fragment>
}


