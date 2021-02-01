import React, {createContext, useReducer, useState} from 'react';
import {user} from '../../store/user';
import {stores} from '../../store/stores';
import {products} from '../../store/products';
import * as server from '../server';

const store = createContext();

const dispatcher = (dispatch, type, payload=null) => {
    if(!payload || (payload && payload.status === 200)) {
        dispatch({
            type: type,
            payload: payload ? payload.data : null
        })
    }
    return payload.status === 200;
}

function StateProvider({children}) {
    const [userState, userDispatch] = useReducer(user.reducer, user.state);
    const [storesState, storesDispatch] = useReducer(stores.reducer, stores.state);
    const [productsState, productsDispatch] = useReducer(products.reducer, products.state);
    const [search, setSearch] = useState({value: '', filters: null});

    const userActions = {
        login: () => server.login().then(res => {
            dispatcher(storesDispatch, 'GET', res)
            dispatcher(productsDispatch, 'GET', res)
            return dispatcher( userDispatch, 'LOGIN', res)
        }),
        logout: () => server.logout().then(res => {
            return dispatcher(  userDispatch, 'LOGOUT')
        }),

        setShippingStatus: id => server.shippmentSent(id).then( res => {
            return dispatcher( userDispatch, 'SHIPPMENT_SENT', res)
        })
    } 

    const storesActions = {
        create: newStore => server.createStore(newStore).then(res => {
            return dispatcher(storesDispatch, 'CREATE', res)
        }),
        edit: (storeId, data) => server.editStore(storeId, data).then(res => {
            return dispatcher(storesDispatch, 'EDIT', res)
            
        }),
        delete: (storeId, isActive) => server.deleteStore(storeId, isActive).then(res => {
            if(isActive) {
                productsDispatch({type:'GET', payload: res.data})
            } 
            return dispatcher(storesDispatch, 'DELETE', res)
        }),
        switch: store => {
            storesDispatch({type:'SWITCH', payload: store});
            server.getProducts(store.id).then(res => {
                return dispatcher(productsDispatch, 'GET', res)
            })
        }
    }
    const productActions = {
        create: newProduct => server.createProduct(newProduct).then(res => {
            return dispatcher(productsDispatch, 'CREATE', res)
        }),
        edit: (prodId, data) => server.editProduct(prodId, data).then(res => {
            return dispatcher(productsDispatch, 'EDIT', res)
        }),
      
        delete: (prodId, storeId) => server.deleteProduct(prodId, storeId).then(res => {
            return dispatcher(productsDispatch, 'DELETE', res)
        }),
    }
    let tabelColumns = {
        Products: {
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
        Transactions : {
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
                dataKey: 'customer_id',
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
        Shippments : {
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
    const globalState =  {
        state: {
            search: search,
            tabelColumns: tabelColumns,
            user : userState,
            stores: storesState,
            products: productsState,
            stats : {
                Products : productsState.stats,
                Transactions : userState.transactions.stats,
                Shippments : userState.shippments.stats,
            }
        },
        dispatch: {
            user : userActions,
            stores: storesActions,
            products: productActions,
            search: setSearch,
        }
    }

    return <store.Provider value={globalState}>
        {children}
    </store.Provider>
}

export {store, StateProvider};