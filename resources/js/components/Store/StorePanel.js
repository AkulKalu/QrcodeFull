import React, { useState, useContext} from 'react';
import Panel from '../Shared/Panel';
import StoreForm from './StoreForm';
import PaymentAPIForm from './PaymentAPIForm';
import {store} from '../HOC/StateProvider';

export default function StoreMenu(props) {
        let {store : storeEntry, errors, close, switchAction} = props;
        
        const {state, dispatch} = useContext(store);
        const [storeData, setStoreData] = useState(storeEntry ? storeEntry : {...state.stores.new});
   
        const inputChange = (value, key) => {
            setStoreData({
                ...storeData,
                [key]: value,
            });
        }

        const prepareData = () => {
            let preparedData = {}
            Object.keys(state.stores.new).forEach( key => {
                storeData[key].length && (preparedData[key] = storeData[key])
            });
            return preparedData;
        }
      
        const closePanel = (statusOk) => {
            if(statusOk) {
                close();
            }
        }

        const create = () => {
            dispatch.stores.create(prepareData())
            .then( res => {
                closePanel(res); 
            })
            
        }

        const edit = () => {
            dispatch.stores.edit(storeData.id, prepareData() )
            .then( res => {
                closePanel(res); 
            });
        }
        
        const remove = () => {
            const confirmed = window.confirm('Deleting the store will also remove all its product. Are you sure?');
            if(confirmed) {
                dispatch.stores.delete(storeData.id, (state.stores.active.id === storeData.id))
                .then(res =>{
                    closePanel(res);
                })
            }
        }

        let buttons = {
            create: {
                name: 'CREATE',
                onClick: create
            },
            edit: {
                name: 'EDIT',
                onClick: edit
            },
            remove: {
                name: "REMOVE",
                onClick : remove,
            },
            close: {
                name : "CLOSE",
                onClick : close
            }
        }

        let editButtons = ['edit', 'remove', 'close'].map( btn => buttons[btn]);
        let createButtons = ['create', 'close'].map( btn => buttons[btn]);
        let formData = {
            inputChange : inputChange,
            storeData : storeData,
            errors : errors,
        }

        return <Panel 
                    name = {storeEntry ? 'EDIT STORE' : 'CREATE STORE'} 
                    buttons={storeEntry ?  editButtons : createButtons }
                    switchAction = {switchAction}
                    left = {
                        <StoreForm {...formData} />
                    }
                    right = {
                        <PaymentAPIForm {...formData} />
                    } >
                </Panel>
}