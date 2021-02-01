function request(urlPath, method, params = null) {
    return window.axios[method](window.location.origin + urlPath, params)
           .then( res => res)
           .catch( err=> err.response);
}

export function login() {
    return request( '/user', 'get');
}
export function logout() {
    return request( '/logout', 'post');
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
export function deleteStore(storeId, isActive) {
    return request('/stores'+ `/${storeId}`, 'post', {
      _method: 'DELETE',
      active: isActive
    })
}



export function getProducts(store) {
    return request('/products', 'get', {
        params:{
            storeId: store
        }
    })
}
export function showProduct(prodId) {
    return request('/products' + `/${prodId}` , 'get')
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

export function shippmentSent(shippmentId) {
    return request('/shippments/send'+ `/${shippmentId}`, 'post', {
      _method: 'PATCH',
    })
}


export function generateQrCode(storeId, productId) {
    return request('/qrcodes' + `/${storeId}` + `/${productId}`, 'get')
}






