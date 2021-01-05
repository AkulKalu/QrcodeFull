import React, {useState, useEffect} from 'react';


export default function WithValidator(Cmp) {
    
    return function ValidatedComponent(props) {
        const [errors, setErrors] = useState({})
        useEffect(()=> {
            const validationInterceptor =  window.axios.interceptors.response.use( response => {
                    setErrors({});
                    return response;
                },  error => {
                    if(error.response.status === 422) {
                       setErrors(error.response.data.errors);
                    }
                    return Promise.reject(error);
                });
    
                return () => {
                    axios.interceptors.request.eject(validationInterceptor);
                }
            
        }, [])
        return <Cmp  errors ={errors} {...props} />
    }
}


