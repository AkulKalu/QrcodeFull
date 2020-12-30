function request(urlPath, method, params = null) {
    console.log(urlPath, method);
    return window.axios[method](window.location.origin + urlPath, params)
           .then( res => res)
           .catch( err=> err.response);
}

export function authenticate() {
    console.log('x');
    return request( '/user', 'get');
}
export function logout() {
    return request( '/logout', 'post');
}

export function getStores() {
    return request('/stores', 'get')
}
export function createStore(storeData) {
    return request('/stores', 'post', {
      ...storeData
    })
}
export function editStore(storeId, storeData) {
    return request('/stores'+ `/${storeId}`, 'post', {
      _method: 'PATCH',
      ...storeData
    })
}
export function deleteStore(storeId) {
    return request('/stores'+ `/${storeId}`, 'post', {
      _method: 'DELETE',
    })
}



export function getProducts(store) {
    return request('/products', 'get', {
        params:{
            storeId: store
        }
    })
}
export function createProduct(productData) {
    return request('/products', 'post', {
      ...productData
    })
}
export function editProduct(productId, productData) {
    return request('/products'+ `/${productId}`, 'post', {
      _method: 'PATCH',
      ...productData
    })
}
export function deleteProduct(productId, storeId) {
    return request('/products'+ `/${productId}`, 'post', {
      _method: 'DELETE',
      store_id : storeId
    })
}


export function getTransactions() {
    return request('/transactions', 'get')
}

export function toogleActive(productId, productInfo) {
    return request('/products/activate'+ `/${productId}`, 'post', {
        ...productInfo
    })
}


export function generateQrCode(storeId, productId) {
    return request('/qrcodes' + `/${storeId}` + `/${productId}`, 'get')
}






