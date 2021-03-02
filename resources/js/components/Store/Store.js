import React, {useContext} from 'react';
import SelectPanel from './SelectPanel';
import AsSwitch from '../HOC/AsSwitch';
import {store} from '../HOC/StateProvider'
import './scss/Store.scss';

let StoreSwitch = AsSwitch(SelectPanel);

export default function Store(props) {
    const {state} = useContext(store);
    const {all, active} = state.stores;
 
    return <div className="Store">
                <StoreSwitch
                    on = {!all.length}
                    button = {
                        {
                            name: active ? active.name.toUpperCase() : 'CREATE STORE' ,
                            className: active ? "StoreBtn" : 'StoreBtn CreateStore'
                        }
                    }
                    atOpen = {{
                        animate: 'fadeIn 0.2s forwards'
                    }}
                    atClose = {{
                        animate: 'fadeOut 0.2s forwards',
                    }}
                />
          </div>
}

