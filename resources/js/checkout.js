require('./bootstrap');
require('./checkoutTheme');

let aboutBtn = document.getElementById('aboutBtn');
let buyBtn = document.getElementById('buyBtn');

let description = document.getElementById('description');
let buyMenu = document.getElementById('buyMenu');

let quantaty = document.getElementById('counter');
let quantatyCount =  document.getElementById('qTotal');

let delivery =  document.getElementById('delivery');
let deliverOn =  document.getElementById('yes');
let deliverOff =  document.getElementById('no');

let stripeBtn =  document.getElementById('stripe');


const paymentInfo = {
    quantaty : 1, 
    delivery : true,
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

function setQuantaty(e) {
    if(e.target.id === 'qL') {
        if(paymentInfo.quantaty > 1) {
            paymentInfo.quantaty--
            quantatyCount.textContent = paymentInfo.quantaty
        }
    }
    else if (e.target.id === 'qR') {
        if(paymentInfo.quantaty < stock) {
            paymentInfo.quantaty++
            quantatyCount.textContent = paymentInfo.quantaty
        }
    }
   
}
function setDelivery(e) {
    let setActive = state => {
        deliverOn.style.opacity =  state ? '1' : '0.6' 
        deliverOff.style.opacity =  !state ? '1' : '0.6' 
    }
    if(e.target.id === 'yes') {
       paymentInfo.delivery = true;
       setActive(paymentInfo.delivery);
    }
    else if (e.target.id === 'no') {
        paymentInfo.delivery = false;
        setActive(paymentInfo.delivery);
    }
}
quantaty.onclick = setQuantaty;
delivery.onclick = setDelivery;
aboutBtn.onclick = () => openWindow(description);
buyBtn.onclick = () => openWindow(buyMenu);
stripeBtn.onclick = chargeWithStripe;

let stripe = Stripe(publicKey);

function chargeWithStripe() {
    window.axios.post(`/checkout/charge/stripe/${productId}`, paymentInfo)
    .then(response => {
      return response;
    })
    .then(session => {
      return stripe.redirectToCheckout({ sessionId: session.data.id });
    })
    .then(result => {
      // If redirectToCheckout fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using error.message.
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(error => {
      console.error("Error:", error.response);
    });
}





