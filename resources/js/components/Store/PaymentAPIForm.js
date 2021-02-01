import React, {Fragment} from 'react';
import TextInput from '../InputElements/TextInput';

export default function PaymentAPIForm(props) {

    let { inputChange, storeData, errors } = props;
    
    return <Fragment>
            <h3>Stripe API</h3>
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
            <h3>PayPal API</h3>
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
        </Fragment>
}