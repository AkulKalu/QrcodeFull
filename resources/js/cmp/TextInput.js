import React, {useState} from 'react';
import '../css/TextInput.css';

export default function TextInput(props) {
    const [validationMessage, setValidationMessage] = useState('')
    const name = props.name.replace(' ', '');
    console.log('x');
    if(props.validate) {
        window.axios.interceptors.response.use(function (response) {
            return response;
          }, function (error) {
            if(error.response.status === 422) {
                let message = error.response.data.errors[props.validate]
                if(message) {
                    console.log(props.validate);
                    setValidationMessage(message);
                }
            }
            return Promise.reject(error);
          });
    }
    let invalidInputStyle = {
        borderColor : 'crimson',
        boxShadow: '0 0 4px crimson'
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
                <span style={{display: "inline-block", margin:"auto"}}>{validationMessage}</span>
         </div>)
   
}