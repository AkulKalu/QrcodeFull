<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"  href="{{ asset('css/product.css') }}">
    <script src="{{ asset('js/checkout.js') }}"  defer ></script>
    <script src="https://js.stripe.com/v3/"></script>
    <title>Product</title>
</head>
<body>
    <div class="ProductImg" >
        <img  src={{ $product->image_url}} alt="product">
    </div>
    <div>
        <span class="ProductName">Toster</span>
        <span class="ProductBrand">Rowenta</span>
        <span class="ProductModel"> XR-100 </span>
        <span class="ProductPrice"> ${{ $product->price}} </span>
    </div>
    <div class="Productinfo">
        <p>
        </p>
    </div>
    <div id="buyBtn" class="ProductBuy">
        <span>Buy</span>
    </div>
        <div id="payMenu" class="PayMenu">
            <form action="{{ url('/checkout/charge/paypal') }}" method="post">
                <input type="hidden" name="productId" value={{$product->id}} />
                {{ csrf_field() }}
                <input type="submit" name="submit" value="PayPal">
            </form>
            <span id="chargeStripe">STRIPE</span>
        </div>
    <div  id="backdrop" class="Backdrop"></div>
    <script>
        // Create an instance of the Stripe object with your publishable API key
        let publicKey = "pk_test_51HYvFzDtXqe1Qv3C6HCSWP7DkhN2VFPiKCXoQB4XTkZgfpSig1MzCBPq2RpdT9baKhJd57ZNEWJhgdLBc0NGkWSR00of2845fP";
        let productId = "{{$product->id}}";
    </script>
</body>
</html>