import React, {useState, } from 'react';
import StorePanel from './StorePanel';
import SelectPanel from './SelectPanel';
import './scss/StoreSelect.scss';

export default function StoreSelect(props) {
    const [mode, setMode] = useState({action:'select'});
   
    const display = () => {
        switch (mode.action) {
            case 'create':
                return <StorePanel  updateStores= {props.updateStores} onClose={() => setMode({action: 'select'})} buttons ={['create']}/>
            case 'edit':
                return <StorePanel updateStores= {props.updateStores} onClose={() => setMode({action: 'select'})} store={mode.object}  buttons={['edit', 'remove']} />
            default:
                return <SelectPanel 
                    stores = {props.stores}
                    setMode = {setMode}
                    closePanel = {props.closePanel}>
                  
                </SelectPanel>
        }
    }

    return display();
}



