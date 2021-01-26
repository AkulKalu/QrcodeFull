<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Iceland&display=swap" rel="stylesheet">
    <link rel="stylesheet"  href="{{ asset('css/product.css') }}">
    <script src="{{ asset('js/checkout.js') }}"  defer ></script>
    <script src="https://www.paypalobjects.com/api/checkout.js"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <title>Product</title>
</head>
<body>
    <div id="imgBg" class="Img" >
        <img  src={{ $product->image_url}} alt="ProductImage">
    </div>
    <main>
        <div class="Info">
            <div class="InfoLarge">{{ $product->manufacturer}}</div>
            <div class="InfoSmall">
                <span >{{ $product->category}}</span>
                <span class="border-left">{{ $product->model}} </span>
            </div>
            
            <div class="Price"> {{ $product->currency}}{{ $product->price}} </div>
        </div>
        <div class="Buttons">
            <div id="aboutBtn" class="Btn About">
                <span>Info</span>
            </div>    
            <div id="buyBtn" class="Btn Buy">
                <span>Buy</span>
            </div>
        </div>
    </main>
    <!-- product info -->
    <div id="description"  class="Window  Description" >
        {{ $product->description}}
    </div>
    <!--  -->
    <div id="buyMenu"  class="Window BuyMenu" >
        <div class="Quantaty">
            <h2>Quantaty</h2>
            <div id='counter' class="Counter">
                <div id="qL" class="Left"></div>
                <div id="qTotal" class="Count" >1</div>
                <div id="qR" class="Right"></div>
            </div>
        </div>
        <h2>Delivery</h2>
        <div id="delivery" class="Delivery">
            <span id="yes">Yes</span>
            <span style="opacity: 0.6;" id="no">No</span>
        </div>
        <h2>Payment</h2>
        <div class="Payment">
            <div id="paypalBtn"><div>
            <input id="stripe" class="Method" type="button" value="Stripe">
        </div>
    </div>
    <script>
        // Create an instance of the Stripe object with your publishable API key
        let publicKey = "{{$public_key}}";
        let productId = "{{$product->id}}";
        let stock = "{{$product->stock}}";
        let theme = @json($theme);
    </script>
</body>
 
</body>
</html>