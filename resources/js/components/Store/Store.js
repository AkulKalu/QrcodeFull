import React from 'react';
import SelectPanel from './SelectPanel';
import AsSwitch from '../HOC/AsSwitch'
import './scss/Store.scss';

let StoreSwitch = AsSwitch(SelectPanel);




export default function Store(props) {
    const {all, active} = props.stores;
 
    return <div className="Store">
                <span>Store:</span>
                <StoreSwitch
                    on = {!Boolean(all.length)}
                    button = {
                        {
                            name: active ? active.name : '.....' ,
                            className:"StoreBtn"
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

