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
    <div id="imgBg" class="ProductImg" >
        <img  src={{ $product->image_url}} alt="product">
    </div>
    <div>
        <span class="ProductName">{{ $product->category}}</span>
        <span class="ProductBrand">{{ $product->manufacturer}}</span>
        <span class="ProductModel">{{ $product->model}} </span>
        <span class="ProductPrice"> {{ $product->currency}}{{ $product->price}} </span>
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
        let publicKey = "{{$public_key}}";
        let productId = "{{$product->id}}";
        let theme = @json($theme);
    </script>
</body>
</html>