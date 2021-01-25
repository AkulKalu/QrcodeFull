<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            <span class="InfoSmall">{{ $product->category}}</span>
            <span class="InfoLarge">{{ $product->manufacturer}}</span>
            <span class="InfoSmall">{{ $product->model}} </span>
            <span class="InfoLarge"> {{ $product->currency}}{{ $product->price}} </span>    
        </div>
        <div class="Buttons">
            <div id="aboutBtn" class="Btn About">
                <span>About</span>
            </div>
            <div id="buyBtn" class="Btn Buy">
                <span>Buy</span>
            </div>
        </div>
    </main>
    <div id="description"  class="Window  Description" >
        {{ $product->description}}
    </div>
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
            <!-- <form action="{{ url('/checkout/charge/paypal') }}" method="post">
                <input type="hidden" name="productId" value={{$product->id}} />
                {{ csrf_field() }}
                <input class="Method" type="submit" name="submit" value="PayPal">
            </form> -->
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