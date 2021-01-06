import React, {Fragment} from 'react';
import Product from './Product';
import Panel from './ProductPanel';
import PanelSwitch from '../HOC/PanelSwitch';
import Button from '../InputElements/Button';
import Table from '../Table/Table'; 
import WithValidator from '../HOC/WithValidator'; 

let ProductPanel = WithValidator(Panel);

export default function Products(props) {
    
    const sortProducts = sortFun => {
        let sorted = [...products];
        sorted.sort(sortFun);
        setProducts(sorted);
    }
    const categoryList = () => {
        return new Set(props.list.map( prod => prod.category));
    }
   
   
    
    return <Fragment>
                <Table 
                    message = 'Add Products'
                    columns = {props.tabelColumns}
                    data={props.list}
                    sort = {sortProducts}
                    filter={props.filter}
                    row = {Product}
                    rowProps = {
                        {
                            columns: props.tabelColumns,
                        }
                    }
                    panel={ProductPanel}
                    panelProps = {
                        {
                            categories: categoryList(),
                            buttons : ['edit', 'remove']
                        }
                    }
                    controls = { <PanelSwitch 
                        panel={ProductPanel} 
                        panelProps={{
                            create: true,
                            categories: categoryList(),
                            buttons : ['add']
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


