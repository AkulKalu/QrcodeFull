import React from 'react';
import './scss/TextInput.scss';

export default function TextInput(props) {
    let {dataList, error, value, onChange} = props;
    let name = props.name.replace(' ', '');
    
    let invalidInputStyle = {
        borderColor : 'crimson',
        boxShadow: '0 0 5px crimson'
    }
    let dataListOptions = dataList ? dataList.map(( option, i) => <option key={`${props.name}${i}opt`} value={option}/>) :null;

    return (
        <div className={props.wrap}>
            <label htmlFor={name}>{props.name}</label>
                <input 
                    style = {error ? invalidInputStyle : null }
                    className="TextInput"
                    list={`${props.name}List`}
                    onChange = {onChange}
                    value={value} 
                    type='text'
                    name={name}>
                </input>
                {error ? <p className="ValidationMessage">{error[0]}</p> : null}
                {dataListOptions ? <datalist id={`${props.name}List`}>{dataListOptions}</datalist> : null}
         </div>)
   
}