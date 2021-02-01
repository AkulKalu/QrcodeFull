import React, {Fragment} from 'react';
import TextInput from '../InputElements/TextInput';

export default function StoreForm(props) {
    let { inputChange, storeData, errors } = props;
    return <Fragment>
            <h3>Store</h3>
            <TextInput 
                wrap = "Group-col" 
                onChange = {e => inputChange(e.target.value, 'name')} 
                name="Name"
                value={storeData.name}
                error = {errors['name']}
                />
            <TextInput 
                wrap = "Group-col" 
                onChange = {e => inputChange(e.target.value, 'website')} 
                name="Website" 
                value={storeData.website}
                error = {errors['website']}
            />
            <h3>Contact</h3>
            <TextInput 
                wrap = "Group-col" 
                onChange = {e => inputChange(e.target.value, 'email')} 
                name="Email"
                value={storeData.email}
                error = {errors['email']}
                />
            <TextInput 
                wrap = "Group-col" 
                onChange = {e => inputChange(e.target.value, 'phone')} 
                name="Phone" 
                value={storeData.phone}
                error = {errors['phone']}
            />
        </Fragment>
}