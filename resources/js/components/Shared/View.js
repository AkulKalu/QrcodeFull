import React  from 'react';
import './scss/View.scss';

export default function View(props) {

    let transactionInfo = Object.keys(props.data).map( (key, i) => {
        if(key === 'index') return null;
        return <div className="ViewInfoCont" key ={`trInfo${i}`}>
                <span className="ViewInfo">{key.replace('_', ' ')}: </span> 
                <span>{props.data[key]}</span>
            </div>
    })
        
    return <div className="View">
            <div className="ViewL">
                {transactionInfo}
            </div>
            <div className="ViewR"></div>
        </div>
      
}