require('./axios');
require('./checkoutTheme');

let aboutBtn = document.getElementById('aboutBtn');
let buyBtn = document.getElementById('buyBtn');

let description = document.getElementById('description');
let buyMenu = document.getElementById('buyMenu');

let quantity = document.getElementById('counter');
let quantityCount =  document.getElementById('qTotal');

let delivery =  document.getElementById('delivery');
let deliverOn =  document.getElementById('yes');
let deliverOff =  document.getElementById('no');

let stripeBtn =  document.getElementById('stripe');

let closeSuccessBtn =  document.getElementById('closeSuccessBtn');




const paymentInfo = {
    quantity : 1, 
    delivery : 1,
}

function openWindow(windowObject, ) {
    windowObject.style.cssText = 'opacity: 1; transform: translateY(0)';
    let close = document.createElement('div');
    close.className = "Back";
    close.textContent = 'back'
    close.onclick = () => closeWindow(close, windowObject);
    windowObject.appendChild(close);
}
function closeWindow(closeBtn, windowObject) {
    windowObject.style.cssText = 'opacity: 0; transform: translateY(100%)';
    windowObject.ontransitionend = () => {
        closeBtn.remove();
    } 
}

function setQuantity(e) {
    if(e.target.id === 'qL') {
        if(paymentInfo.quantity > 1) {
            paymentInfo.quantity--
            quantityCount.textContent = paymentInfo.quantity
        }
    }
    else if (e.target.id === 'qR') {
        if(paymentInfo.quantity < stock) {
            paymentInfo.quantity++
            quantityCount.textContent = paymentInfo.quantity
        }
    }
   
}
function setDelivery(e) {
    let setActive = state => {
        deliverOn.style.opacity =  state ? '1' : '0.6' 
        deliverOff.style.opacity =  !state ? '1' : '0.6' 
    }
    if(e.target.id === 'yes') {
       paymentInfo.delivery = 1;
       setActive(paymentInfo.delivery);
    }
    else if (e.target.id === 'no') {
        paymentInfo.delivery = 0;
        setActive(paymentInfo.delivery);
    }
}
quantity.onclick = setQuantity;
delivery.onclick = setDelivery;
aboutBtn.onclick = () => openWindow(description);
buyBtn.onclick = () => openWindow(buyMenu);
stripeBtn.onclick = chargeWithStripe;

if( closeSuccessBtn ) {
  closeSuccessBtn.onclick = e => {
    let successWindow = document.getElementById('succesWindow');
    successWindow.style.opacity = '0';
    successWindow.ontransitionend = () => {
      successWindow.style.display = 'none';
    }
  }
}



let stripe = Stripe(publicKey);

function chargeWithStripe() {
    window.axios.post(`/checkout/charge/stripe/${productId}`, paymentInfo)
    .then(response => {
      return response;
    })
    .then(session => {
      return stripe.redirectToCheckout({ sessionId: session.data.id });
    })
    .then(response => {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (response.error) {
        alert(response.error.message);
      }
    })
}

paypal.Button.render({
    env: 'sandbox', // Or 'production'
    style: {
      size: 'medium'
    },
    // Set up the payment:
    // 1. Add a payment callback
    payment: function(data, actions) {
      // 2. Make a request to your server
     
      return window.axios.post(`/checkout/charge/paypal_create`, {id: productId, ...paymentInfo})
      .then(response => {
        if (response.error) {
          alert(response.error.message);
        }
        return response.data.id;
      })
      
    },
    // Execute the payment:
    // 1. Add an onAuthorize callback
    onAuthorize: function(data, actions) {
      // 2. Make a request to your server
      return window.axios.post(`/checkout/charge/paypal_execute`,{
        paymentID: data.paymentID,
        payerID:   data.payerID,
        productId: productId,
      })
      .then(response => {
        if (response.error) {
          alert(response.error.message);
        }else {
          window.location.href =  window.location.href + '/success_paypal';
        }
      });
    }
  }, '#paypalBtn');







