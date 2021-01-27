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
            @if($product->stock)   
            <div id="buyBtn" class="Btn Buy">
                <span>Buy</span>
            </div>
            @else
            <span>Not in stock!</span>
            @endif
        </div>
    </main>
    @isset($purchaseCompleted )        
        <div class="Success" id="succesWindow">
            <div class="Message">
                <div>
                    <p>Your {{$purchaseCompleted}} transaction has been successfull.</p>
                    <p>Details have been sent to your email addres, if you have any questions contact us at:</p>
                    <a href="mailto: {{ $product->store->email }}" >{{ $product->store->email }}</a>
                    @isset($product->store->phone )
                        <p>or by phone: {{ $product->store->phone }}</p>
                    @endisset
                    <div id="closeSuccessBtn" class="Btn">Thanks!</div>
                </div>
                
            </div>
        </div>
    @endisset
    <!-- product info -->
    <div id="description"  class="Window  Description" >
        {{ $product->description}}
    </div>
    <!--  -->

    <!-- buy window -->
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
         <input id="stripe" class="Method" type="button" value="Stripe">
         <div class="PayPal">Paypal 
            <div class="PayPalBtn"  id="paypalBtn"><div>
         </div>
            
        </div>
    </div>
    <!--  -->
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