import React, {Component} from 'react';
import Logo from './logo';
import Store from './Store';
import Settings from './Settings';
import User from './User';
import SettingsMenu from './SettingsMenu';
import SideMenu from './SideMenu';
import Backdrop from './Backdrop';
import Table from './Table';
import SearchBar from './SearchBar';
import '../css/ControlPanel.css';
import ReactDOM from 'react-dom';




 class ControlPanel extends Component {
    state = {
        user: null,
        activeStore: null,
        table: 'products',
        toAdd: null,
        settingsOpen: false,
        searchFor: '',
    }
    componentDidMount() {
        window.axios.get(window.location.origin + '/user')
        .then(user => {
           if(user.data) {
               this.setState({user: user.data});
           }
        })
    }
    setActiveStore = active => this.setState({activeStore : active});
    switchTable = table => this.setState({table : table});
    searchTable = value => this.setState({
        searchFor: value
    })

    settingsSwitch = () => this.setState({settingsOpen: !this.state.settingsOpen});
   

    addProduct = product => {
        this.setState({
            toAdd: product
        })
    }
    closeSettings = e => {
            this.setState({
                settingsOpen: false,
            })
    }

    render() {
        return <div>
                   {this.state.user ? 
                    <div>
                        <aside>
                            <Logo/>
                            <SideMenu 
                                activeStore = {this.state.activeStore} 
                                addProduct = {this.addProduct}
                                switchTable = {this.switchTable}
                            />
                        </aside>
                         <div className="CPBarWrap">
                            <div className="CPBar">
                                <div className="CPBarStore">
                                    <Store active={this.state.activeStore} 
                                        setActiveStore ={this.setActiveStore}
                                        storeSwitch={this.storeSwitch}
                                        storeSettingsSwitch={this.storeSettingsSwitch}/>
                                    </div>
                                <div className="CPBarSearch">
                                    <SearchBar searchTable={this.searchTable} />
                                </div>
                                <div className="CPAccount">
                                    <Settings settingsSwitch={this.settingsSwitch}/>
                                    <User user={this.state.user} />
                                </div>
                            </div>
                        </div>
                      
                        <Table
                            table = {this.state.table}
                            activeStore = {this.state.activeStore}
                            searchFor = {this.state.searchFor}
                            toAdd={this.state.toAdd}
                        />
                    </div>: null
                    }

                    {this.state.settingsOpen ? 
                    <Backdrop >
                        <SettingsMenu 
                        closeSwitch={this.closeSettings}
                         />
                    </Backdrop> : null
                    } 
                   
               </div>
    }
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<ControlPanel />, document.getElementById('ControlPanel'));
}
