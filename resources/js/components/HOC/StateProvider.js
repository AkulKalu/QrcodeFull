import React, {Children, createContext, useReducer} from 'react';
import {user} from '../../store/user';
import {stores} from '../../store/stores';
import * as server from '../../Functions/server';

const store = createContext();

const dispatcher = (type, payload=null) => {
    return {
        type: type,
        payload: payload
    }
}

function StateProvider({children}) {
    const [userState, userDispatch] = useReducer(user.reducer, user.state);
    const [storesState, storesDispatch] = useReducer(stores.reducer, stores.state);

    const userActions = {
        login: () => server.login().then(res => {
            console.log(res);
            userDispatch(dispatcher('LOGIN', res.data.user))
            storesDispatch(dispatcher('GET', res.data.stores))
        }),
        logout: () => server.logout().then(res => {
            userDispatch(dispatcher('LOGOUT'))
        }),
    } 

    const storesActions = {
        get: () => server.getStores().then(res => {
            storesDispatch(dispatcher('GET', res.data))
        }),
        create: newStore => server.createStore(newStore).then(res => {
            console.log(res);
            storesDispatch(dispatcher('CREATE', res.data))
            return true;
        }),
        edit: storeId => server.editStore(storeId).then(res => {
            storesDispatch(dispatcher('EDIT', res.data))
        }),
        delete: storeId => server.deleteStore(storeId).then(res => {
            storesDispatch(dispatcher('DELETE', res.data))
        }),
        switch: store => storesDispatch(dispatcher('SWITCH', store)),
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