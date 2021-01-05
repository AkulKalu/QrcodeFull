import React from 'react';
import './scss/TextInput.scss';

export default function TextInput(props) {
    const name = props.name.replace(' ', '');
    
    let invalidInputStyle = {
        borderColor : 'crimson',
        boxShadow: '0 0 5px crimson'
    }
    let dataListOptions = props.dataList ? props.dataList.map(( option, i) => <option key={`${props.name}${i}opt`} value={option}/>) :null;

    return (
        <div className={props.wrap}>
            <label htmlFor={name}>{props.name}</label>
                <input 
                    style = {props.error ? invalidInputStyle : null }
                    className="TextInput"
                    list={`${props.name}List`}
                    onChange = {props.onChange}
                    value={props.value} 
                    type='text'
                    name={name}>
                </input>
                {props.error ? <p className="ValidationMessage">{props.error[0]}</p> : null}
                {dataListOptions ? <datalist id={`${props.name}List`}>{dataListOptions}</datalist> : null}
         </div>)
   
}