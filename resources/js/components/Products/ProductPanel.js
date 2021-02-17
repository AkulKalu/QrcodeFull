import React, {useState, useContext} from 'react';
import Panel from '../Shared/Panel';
import Form from './Form';
import WithValidator from '../HOC/WithValidator'; 
import ProductPreview, { themeCoder } from './ProductPreview';
import {store} from '../HOC/StateProvider';

const ProductForm = WithValidator(Form);

export default function ProductPanel(props)  {
    let {add, data, close : closePanel, switchAction} = props;
    const {state, dispatch} = useContext(store);
    const [productData, setProductData] = useState( add ? {...state.products.new} :  {...data} );
    const [colorPallete, setColorPallete] = useState(themeCoder.fromCode(add ? state.products.new.theme:  data.theme));
    
    const inputChange = (value, key) => {
        setProductData({
            ...productData,
            [key]:value
        })
    }
    const close = res => {
        if(res) {
            closePanel();
        }
    }

    const prepareData = () => {
        let preparedData = {}
        Object.keys(state.products.new).forEach( key => {
            (productData[key] || productData[key] === 0 ) && (preparedData[key] = productData[key])
        });

        preparedData['store_id'] = state.stores.active.id
        preparedData['theme'] = themeCoder.encode(colorPallete)

        return preparedData;
    }

    const create = () => {
        dispatch.products.create(prepareData())
        .then( res =>{
           close(res);
        })
    }

    const edit = () => {

        dispatch.products.edit(productData.id, prepareData())
        .then( res =>{
            close(res);
        })
    }
    const remove = () => {
        const confirmed = window.confirm('Deleting this product. Are you sure?');
        if(confirmed) {
            close(true);
            dispatch.products.delete(productData.id, productData.store_id)
        } 
    }
    const buttons = {
        create: { 
            name : 'CREATE' ,
            onClick:   create,
        },
        edit: { 
            name : 'EDIT',
            onClick:   edit,
        },
        remove:{ 
            name: 'REMOVE',
            onClick: remove
        },
        close: {
            name: 'CLOSE',
            onClick: closePanel
        }
    };

    let editButtons = ['edit', 'remove', 'close'].map( btn => buttons[btn]);
    let createButtons = ['create', 'close'].map( btn => buttons[btn]);
    
    return <Panel 
                name = {add ? "CREATE PRODUCT" : "EDIT PRODUCT"}
                buttons={add ? createButtons : editButtons}
                switchAction = {switchAction}
                right={
                    <ProductPreview 
                        colorPallete={colorPallete} 
                        setColorPallete={setColorPallete} 
                        product={productData}
                    />} 
                left = {<ProductForm 
                    inputChange = {inputChange} 
                    productData = { productData } 
                    state ={state} />}
                >       
        </Panel>
      
}