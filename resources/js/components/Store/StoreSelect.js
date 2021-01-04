import React, {useState, } from 'react';
import StorePanel from './StorePanel';
import SelectPanel from './SelectPanel';
import './scss/StoreSelect.scss';

export default function StoreSelect(props) {
    const [mode, setMode] = useState({action:'select'});

    const closeStorePanel = () => {
        props.closePanel();
        setMode({action: 'select'});
    }
    
    const display = () => {
        switch (mode.action) {
            case 'create':
                return <StorePanel  onClose={closeStorePanel}  buttons ={['create']}/>
            case 'edit':
                return <StorePanel  onClose={closeStorePanel} store={mode.object}  buttons={['edit', 'remove']} />
            default:
                return <SelectPanel 
                    setMode = {setMode}
                    closePanel = {props.closePanel}>
                </SelectPanel>
        }
    }

    return display();
}



