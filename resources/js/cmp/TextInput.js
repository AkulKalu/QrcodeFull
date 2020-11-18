import React, {useState, useEffect} from 'react';
import '../css/TextInput.css';

export default function TextInput(props) {
    const [validationMessage, setValidationMessage] = useState('')
    const name = props.name.replace(' ', '');
   

    useEffect(()=> {
        if(props.validate) {
            const validationInterceptor =  window.axios.interceptors.response.use( response => {
                    return response;
                },  error => {

                    if(error.response.status === 422) {
                        let message = error.response.data.errors[props.validate]
                        if(message) {
                            setValidationMessage(message);
                        }else {
                            setValidationMessage('');
                        }
                        
                    }
                    return Promise.reject(error);
                });

              return () => {
                axios.interceptors.request.eject(validationInterceptor);
              }
        }
    }, [])
   

    
    let invalidInputStyle = {
        borderColor : 'crimson',
        boxShadow: '0 0 5px crimson'
    }

    return (
        <div style={props.style} className="FormGroup ">
            <label className="SettingsMenuLabel" htmlFor={name}>{props.name}</label>
                <input 
                    style = {validationMessage.length ? invalidInputStyle : null }
                    className="TXIInput"
                    onChange = {props.onChange}
                    value={props.value} 
                    type='text'
                    name={name}>
                </input>
                <p className="ValidationMessage">{validationMessage}</p>
         </div>)
   
}