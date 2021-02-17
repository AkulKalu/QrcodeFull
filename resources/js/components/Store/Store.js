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
                    on = {!all.length}
                    button = {
                        {
                            name: active ? active.name : '.....' ,
                            className:"StoreBtn Orange"
                        }
                    }
                    atOpen = {{
                        animate: 'fadeIn 0.2s forwards'
                    }}
                    atClose = {{
                        animate: 'slide-out-right 0.4s forwards',
                    }}
                />
          </div>
}

