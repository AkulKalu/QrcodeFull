import React, {Fragment} from 'react';
import FormGroup from '../Shared/FormGroup'
import TextInput from '../InputElements/TextInput';

export default function PaymentAPIForm(props) {

    let { inputChange, storeData, errors } = props;
    
    return <Fragment>
            <FormGroup name='STRIPE API'>
                <TextInput
                    wrap = "Group-col" 
                    onChange = {e => inputChange(e.target.value, 'stripe_public_key')}
                    name = "Public Key"
                    value={storeData.stripe_public_key} 
                    error = {errors['stripe_public_key']}
                />
                <TextInput
                    wrap = "Group-col" 
                    onChange = {e => inputChange(e.target.value, 'stripe_private_key')}
                    name = "Private Key"
                    value={storeData.stripe_private_key} 
                    error = {errors['stripe_private_key']}
                />
            </FormGroup>
            <FormGroup name='PAYPAL API'>
                <TextInput
                    wrap = "Group-col"     
                    onChange = {e => inputChange(e.target.value, 'paypal_client_id')}
                    name = "Client Id"
                    value={storeData.paypal_client_id} 
                    error ={errors['paypal_client_id']}
                />
                <TextInput
                    wrap = "Group-col" 
                    onChange = {e => inputChange(e.target.value, 'paypal_private_key')}
                    name = "Private Key"
                    value={storeData.paypal_private_key} 
                    error = {errors['paypal_private_key']}
                />
             </FormGroup>
        </Fragment>
}