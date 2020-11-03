import React, {Component} from 'react';
import '../css/SettingsMenu.css';
import TextInput from '../cmp/TextInput';
import StripeLogo from '../storage/StripeLogo.svg';
import PayPalLogo from '../storage/PayPal.svg';


export default class SettingsMenu extends Component {
    state = {
        companyName: '',
        website: '',
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
  
    render() {
       
        return <div className="SettingsMenu">
                <form>
                <h1>Setup Payment</h1>
                    <TextInput
                        onChange = {e => this.inputChangeHandler(e.target.value, 'companyName')}
                        name = "Company Name"
                        value={this.state.companyName} 
                    />
                    
                    <TextInput
                        onChange = {e => this.inputChangeHandler(e.target.value, 'website')}
                        name = "Website"
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
                            onClick={this.props.saveSwitch}
                            disabled={!this.state.changed} 
                            className={this.state.changed ? "SettingsBtn" : "SettingsBtnDisabled"} >
                            SAVE
                        </button>
                        <button onClick={this.props.closeSwitch}  type="button" className="SettingsBtn">CLOSE</button>
                    </div>
                </form>              
            </div>
    }   
}