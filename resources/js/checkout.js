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


document.getElementById('buyBtn').onclick = openPayMenu;