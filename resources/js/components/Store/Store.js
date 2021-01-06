import React from 'react';
import PanelSwitch from '../HOC/PanelSwitch';
import StoreSelect from './StoreSelect';
import Button from '../InputElements/Button';
import './scss/Store.scss';




export default function Store(props) {
    const {list, active} = props.stores;

    return <div className="Store">
                <span>Store:</span>
                <PanelSwitch 
                    on = {!Boolean(list.length)}
                    panel={StoreSelect} 
                    element= {Button}
                    elementProps= {
                        {
                            name: active ? active.name : '.....' ,
                            className:"StoreBtn"
                        }
                    }>
                </PanelSwitch>
          </div>
}

