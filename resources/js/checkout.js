require('./bootstrap');

let menu = document.getElementById('payMenu');
let backdrop = document.getElementById('backdrop');

function openPayMenu() {
    menu.style.cssText = 'transform: translateY(-31vh); opacity: 1';
    backdrop.style.display = 'block';
    backdrop.onclick = closePayMenu;
}
function closePayMenu() {
    menu.style.cssText = '';
    backdrop.style.display = 'none'
    backdrop.onclick = null;
}

let stripe = Stripe(publicKey);

function chargeWithStripe() {
    window.axios.post(`/checkout/charge/stripe/${productId}`)
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
      console.error("Error:", error);
    });
}



document.getElementById('chargeStripe').onclick = chargeWithStripe;
document.getElementById('buyBtn').onclick = openPayMenu;
