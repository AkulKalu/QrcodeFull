import React, {useState, } from 'react';
import StorePanel from './StorePanel';
import SelectPanel from './SelectPanel';
import WithValidator from '../HOC/WithValidator';
import './scss/StoreSelect.scss';

let Panel = WithValidator(StorePanel);

export default function StoreSelect(props) {
    const [mode, setMode] = useState({action:'select'});

    const display = () => {
        switch (mode.action) {
            case 'create':
                return <Panel  onClose={() => setMode({action: 'select'})}  buttons ={['create']}/>
            case 'edit':
                return <Panel  onClose={() => setMode({action: 'select'})} store={mode.object}  buttons={['edit', 'remove']} />
            default:
                return <SelectPanel 
                    setMode = {setMode}
                    closePanel = {props.closePanel}>
                </SelectPanel>
        }
    }

    return display();
}



