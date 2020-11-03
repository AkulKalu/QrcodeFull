import React, {Component} from 'react';
import '../css/SettingsMenu.css';
import TextInput from '../cmp/TextInput';
import SelectList from '../cmp/SelectList';
import StripeLogo from '../storage/StripeLogo.svg';
import PayPalLogo from '../storage/PayPal.svg';




export default class SettingsMenu extends Component {
    state = {
        store: null,
        name: '',
        website:'',
        stripe: {
            publicKey: '',
            privateKey: '',
        },
        payPal: {
            clientId: '',
            privateKey: '',
        },
        changed: false
    }
  
   
    inputChangeHandler = (value, key, key2 = null) => {
        this.setState({
            [key] : key2 ? { [key2] :value } : value,
            changed: true,
        });
    }

    storeSwitchHandler = e => {
        const storeId = parseInt(e.target.value);
        const store = this.props.stores[storeId];
        let update = null;

        if(store) {
           update =  {
                store: store,
                name:  store.name ,
                website: store.website ,
            }
        }else {
            update =  {
                store: null,
                name:  '',
                website: '',
            }
        }

        this.setState({
            ...update,
            changed: false
        })
    }

    createStoreHandler = () => {
        const url =  window.location.origin + '/stores';
        const data = {
            name: this.state.name,
            website:this.state.website,
        }

        window.axios.post(url, data)
        .then( res => {
            this.props.closeSwitch();
            this.props.updateStores(res.data.stores, res.data.created)
        })
        .catch( err => console.log(err));
    }

    editStoreHandler = () => {
        const url =  window.location.origin + '/stores' + `/${this.state.store.id}`;
        const data = {
            _method: 'PATCH',
            name: this.state.name,
            website:this.state.website,
        }

        window.axios.post(url, data)
        .then( res => {
            this.props.closeSwitch();
            this.props.updateStores(res.data.stores, res.data.updated);
        })
        .catch( err => console.log(err));
    }
    
    removeStoreHandler = () => {
        const confirmed = confirm('Deleting the stor will also remove all its product.Are you sure?');
        if(confirmed) {
            const url = window.location.origin + '/stores' + `/${this.state.store.id}`;
            const data = {
                _method: 'DELETE'
            }
            window.axios.post(url, data)
            .then( res =>{
               this.props.updateStores(res.data, res.data[Object.keys(res.data)[0]])
               this.setState({
                   store: null
               })
            })
            .catch( err => console.log(err));
        }
    }
    
    render() {
        let stores = null;
        if(this.props.stores) {
            stores = Object.keys(this.props.stores).map(
                (storeKey, i) => {
                    const store = this.props.stores[storeKey];
                        return <option  key={`storeOption${i}`} value={store.id}>{store.name}</option>
                }
            );
        }

        return <div className="SettingsMenu">
                <form>
                <h1>Setup Store</h1>
                    <SelectList 
                        select = {this.storeSwitchHandler}  
                        storeMenu 
                        GroupStyle={{paddingBottom: '1rem'}} 
                        options={stores} 
                    />
                    <TextInput  
                        onChange = {e => this.inputChangeHandler(e.target.value, 'name')} 
                        name="Name"
                        value={this.state.name} 
                    />
                    <TextInput  
                        onChange = {e => this.inputChangeHandler(e.target.value, 'website')} 
                        name="Website" 
                        value={this.state.website}
                    />

                    <div style={{paddingTop:'1rem'}}>
                        <div className="FormGroup">
                            <img alt="stripe" src={StripeLogo}></img>
                        </div>
                        <TextInput
                            onChange = {e => this.inputChangeHandler(e.target.value, 'stripe', 'publicKey')}
                            name = "Public Key"
                            value={this.state.stripe.publicKey} 
                        />
                         <TextInput
                            onChange = {e => this.inputChangeHandler(e.target.value, 'stripe', 'privateKey')}
                            name = "Private Key"
                            value={this.state.stripe.privateKey} 
                        />
                    </div>
                    <div style={{paddingTop:'1rem'}}>
                        <div className="FormGroup">
                            <img alt="PayPal" src={PayPalLogo}></img>
                        </div>
                        <TextInput
                            onChange = {e => this.inputChangeHandler(e.target.value, 'payPal', 'clientId')}
                            name = "Client Id"
                            value={this.state.payPal.clientId} 
                        />
                         <TextInput
                            onChange = {e => this.inputChangeHandler(e.target.value, 'payPal', 'privateKey')}
                            name = "Private Key"
                            value={this.state.payPal.privateKey} 
                        />

                    </div>
                   
                    <div style={{margin:'2rem 0', flexDirection: "row"}} className="FormGroup">
                        <button  
                            type="button"
                            onClick={ this.state.store ? this.editStoreHandler  : this.createStoreHandler }
                            disabled={!this.state.changed} 
                            className={this.state.changed ? "SettingsBtn" : "SettingsBtnDisabled"} >
                            {this.state.store ? 'EDIT' : 'CREATE'}
                        </button>
                        <button  
                            type="button"
                            onClick={this.removeStoreHandler}
                            disabled={ this.state.store === null } 
                            className={this.state.store ? "SettingsBtn" : "SettingsBtnDisabled"} >
                            REMOVE
                        </button>
                        <button onClick={this.props.closeSwitch}  type="button" className="SettingsBtn">CLOSE</button>
                    </div>
                </form>              
            </div>
    }   
}