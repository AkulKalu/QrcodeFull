import React, {useEffect, useState, Fragment, useContext} from 'react';
import Logo from '../Visual/logo';
import Store from '../Store/Store';
import User from './User';
import LoadScreen from '../Visual/LoadScreen';
import SideMenu from './SideMenu';
import Products from '../Products/Products';
import Transactions from '../Transactions/Transactions';
import Shippments from '../Shippments/Shippments';
import SearchBar from './SearchBar';
import './scss/ControlPanel.scss';
import ReactDOM from 'react-dom';
import {store, StateProvider} from '../HOC/StateProvider';
import {login} from '../../Functions/server'



function ControlPanel() {
     const [loading, setLoading] = useState(false);
     const [activeStore, setActiveStore] = useState();
     const [table, setTable] = useState(1);
     const [filter, setFilter] = useState(null);
     
     const {state, dispatch} = useContext(store);

    useEffect(()=> {
        dispatch.user.login()
    },[])

    let stats = {
        1 : {
            total: {
                value: 10,
            },
            active: {
                value: 1,
            },
            categories: {
                value: 1,
            }
        },
        2 : {
            today: {
                value: 1,
                color: 'green',
            },
            income: {
                value: '10$',
                color: 'green',
            },
            total: {
                value: 1,
                color: 'green',
            }
        },
        3 : {
            pending: {
                value: 5,
                color: 'green'
            } ,
            sent: {
                value: 5,
                color: 'green'
            }
            
        }
    }
    let tabelColumns = {
        1 : {
            Image: {
                dataKey: 'image_url'
            },
            Category: {
                sort:true,
                dataKey: 'category',
                search : false
            },
            Model: {
                sort:true,
                dataKey: 'model',
                search : true,
            },
            Manufacturer : {
                sort:true,
                dataKey: 'manufacturer',
                search : true,
            },
            Price : {
                sort:true,
                dataKey: 'price',
                search : false
            },
            Stock : {
                sort: true,
                dataKey: 'stock',
                search : true,
            },
            Active : {
                sort:true,
                dataKey: 'active'
            },
            QrCode : {
            }
        },
        2 : {
            Date : {
                sort:true,
                dataKey: 'created_at'
            },
            Service: {
                sort:true,
                dataKey: 'service',
                search : false,
            },
            Id: {
                sort:true,
                dataKey: 'transaction_id',
                search : false,
            },
            'Customer id': {
                sort:true,
                dataKey: 'transaction_id',
                search : false,
            },
            'Customer email': {
                sort:true,
                dataKey: 'customer_email',
                search : true,
            },
            Amount : {
                sort:true,
                dataKey: 'amount',
                search : true,
            },
            Currency : {
                sort:true,
                dataKey: 'currency',
                search : false,
            },
            Status : {
                sort:true,
                dataKey: 'status'
            }
        },
        3 : {
            Name: {
                sort:true,
                dataKey: 'name',
                search: true,
            },
            City: {
                sort:true,
                dataKey: 'city',
                search: false,
            },
            Country: {
                sort:true,
                dataKey: 'country',
                search: false,
            },
            State: {
                sort:true,
                dataKey: 'state',
                search: false,
            },
            ZIP: {
                sort:true,
                dataKey: 'postal_code',
                search: true,
            },
            Address : {
                sort:true,
                dataKey: 'line1',
                search: false,
            },
            'Address 2' : {
                sort:true,
                dataKey: 'line2',
                search: false,
            },
            Shipped : {
                dataKey: 'shipped'
            }
    }}
   
    const switchTable = table => {
        setFilter(null);
        setTable(table);
    }

    const displayTable = () => {
        switch (table) {
            case 2:
                return <Transactions
                            filter = {filter}
                            tabelColumns = {tabelColumns[2]}
                       />
            case 3:
                return <Shippments
                            filter = {filter}
                            tabelColumns = {tabelColumns[3]}
                        />
            default:
                return <Products
                            activeStore = {activeStore}
                            filter = {filter}
                            tabelColumns = {tabelColumns[1]}
                       />
        }
    }
    

    return <Fragment  >
                {loading ?  <LoadScreen panelLoaded={()=> setLoading(false)} user={state.user} /> : null }
                {state.user ? 
                <div className="CPanel">
                    <aside>
                        <div className="Logo">
                            {!loading ? <Logo type="LogoPanel"/> : null }
                        </div>
                        <div className="User">
                            <User />
                        </div>
                        <div className="Menu">
                            <SideMenu 
                                switchTable = {switchTable}
                                stats = {{[table] : stats[table]}}
                            />
                        </div>
            
                    </aside>
                    <main>
                
                        <div className="TopBar">
                            <div className="BarStore">
                                <Store active={state.stores.active} />
                            </div>
                            <div className="BarSearch">
                                <SearchBar table={table} columns={tabelColumns[table]} setFilter={setFilter}  />
                            </div>
                        </div>
                      
                        <div className="TableCont">
                            {displayTable()}
                        </div>
                    </main>
                </div>: null
                }
            </Fragment>
    
}

if (document.getElementById('ControlPanel')) {
    ReactDOM.render(<StateProvider> <ControlPanel /> </StateProvider>, document.getElementById('ControlPanel'));
}
