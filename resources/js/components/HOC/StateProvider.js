import React, {createContext, useReducer} from 'react';
import {user} from '../../store/user';
import {stores} from '../../store/stores';
import * as server from '../../Functions/server';

const store = createContext();

const dispatcher = (dispatch, type, payload=null) => {
    if(!payload || (payload && payload.status === 200)) {
        dispatch({
            type: type,
            payload: payload.data
        })
    }
    return payload.status === 200;
}

function StateProvider({children}) {
    const [userState, userDispatch] = useReducer(user.reducer, user.state);
    const [storesState, storesDispatch] = useReducer(stores.reducer, stores.state);

    const userActions = {
        login: () => server.login().then(res => {
            dispatcher( userDispatch, 'LOGIN', res)
            return dispatcher(storesDispatch, 'GET', res)
        }),
        logout: () => server.logout().then(res => {
            return dispatcher(  userDispatch, 'LOGOUT')
        }),
    } 

    const storesActions = {
        get: () => server.getStores().then(res => {
            return dispatcher(storesDispatch, 'GET', res)
        }),
        create: newStore => server.createStore(newStore).then(res => {
            return dispatcher(storesDispatch, 'CREATE', res)
        }),
        edit: (storeId, data, idx) => server.editStore(storeId, data).then(res => {
            res.data['idx'] = idx;
            return dispatcher(storesDispatch, 'EDIT', res)
        }),
        delete: (storeId, idx) => server.deleteStore(storeId).then(res => {
            res.data['idx'] = idx;
            return dispatcher(storesDispatch, 'DELETE', res)
        }),
        switch: store => storesDispatch({type:'SWITCH', payload: store})
    }

    const globalState =  {
        state: {
            user : userState,
            stores: storesState
        },
        dispatch: {
            user : userActions,
            stores: storesActions,
        }
    }

    return <store.Provider value={globalState}>
        {children}
    </store.Provider>
}

export {store, StateProvider};