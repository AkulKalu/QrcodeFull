import React from 'react';
import PanelSwitch from '../HOC/PanelSwitch';
import StoreSelect from './StoreSelect';
import Button from '../InputElements/Button';
import './scss/Store.scss';




export default function Store(props) {
    
    return <div className="Store">
                <span>Store:</span>
                <PanelSwitch 
                    panel={StoreSelect} 
                    element= {Button}
                    elementProps= {
                        {
                            name: props.active ? props.active : '.....' ,
                            className:"StoreBtn"
                        }
                    }>
                </PanelSwitch>
          </div>
}

