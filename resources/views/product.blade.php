<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="{{ asset('css/product.css') }}">
    <script src="{{ asset('js/checkout.js') }}"  defer ></script>
    <title>Product</title>
</head>
<body>
    <div class="ProductImg" >
        <img  src="https://images-na.ssl-images-amazon.com/images/I/71tTrwtl3rL._SL1500_.jpg" alt="product">
    </div>
    <div>
        <span class="ProductName">Toster</span>
        <span class="ProductBrand">Rowenta</span>
        <span class="ProductModel"> XR-100 </span>
        <span class="ProductPrice"> $400 </span>
    </div>
    <div class="Productinfo">
        <p>
        </p>
    </div>
    <div id="buyBtn" class="ProductBuy">
        <span>Buy</span>
    </div>
        <div id="payMenu" class="PayMenu">
            <span>PAYPAL</span>
            <span>STRIPE</span>
        </div>
    <div  id="backdrop" class="Backdrop"></div>
</body>
</html>