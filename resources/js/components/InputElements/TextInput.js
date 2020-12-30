import React, {useState, useEffect} from 'react';
import './scss/TextInput.scss';

export default function TextInput(props) {
    const [validationMessage, setValidationMessage] = useState('')
    const name = props.name.replace(' ', '');
   

    useEffect(()=> {
        if(props.validate) {
            // const validationInterceptor =  window.axios.interceptors.response.use( response => {
            //         return response;
            //     },  error => {

            //         if(error.response.status === 422) {
            //             let message = error.response.data.errors[props.validate]
            //             if(message) {
            //                 setValidationMessage(message);
            //             }else {
            //                 setValidationMessage('');
            //             }
                        
            //         }
            //         return Promise.reject(error);
            //     });

            //   return () => {
            //     axios.interceptors.request.eject(validationInterceptor);
            //   }
        }
    }, [])
   

    
    let invalidInputStyle = {
        borderColor : 'crimson',
        boxShadow: '0 0 5px crimson'
    }
    let dataListOptions = props.dataList ? props.dataList.map(( option, i) => <option key={`${props.name}${i}opt`} value={option}/>) :null;

    return (
        <div className={props.wrap}>
            <label htmlFor={name}>{props.name}</label>
                <input 
                    style = {validationMessage.length ? invalidInputStyle : null }
                    className="TextInput"
                    list={`${props.name}List`}
                    onChange = {props.onChange}
                    value={props.value} 
                    type='text'
                    name={name}>
                </input>
                <p className="ValidationMessage">{validationMessage}</p>
                {dataListOptions ? <datalist id={`${props.name}List`}>{dataListOptions}</datalist> : null}
         </div>)
   
}