@extends('layouts.mail')

@section('content')
        <div class="title">
            <h2>ORDER COMPLETED</h2>
        </div>
        <div class="message">
           <p>Thank you for doing buisness with us. If you have any questions or issues regearding 
               your order please contact us at <a href="mailto: abc@example.com">mail@gmail.com</a>. Make sure you provide your order id
               in the email.
           </p>
        </div>
        <div class="info">
            <h4>Order:</h4>
            <ul class="list">
                <li class="data">
                    <span class="li-itm-title">id:</span><span>{{$order['transaction_id']}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">product:</span><span>{{$product->category}} {{$product->model}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">price:</span><span>{{$product->price}}{{$product->currency}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">quantaty:</span><span>1</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">service:</span><span>{{$order['service']}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">shipping:</span><span>no</span>
                </li>
            </ul>
            <div class="amount"><span class="li-itm-title">TOTAL:</span>{{$order['amount']}}{{$product->currency}}</div>
        </div>
        <div class="info">
            <h4>Shipping info:</h4>
            <ul class="list">
                <li class="data">
                    <span class="li-itm-title">id:</span><span>asdj54664656</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">product:</span><span>Toster-XR-400</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">price:</span><span>400$</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">quantaty:</span><span>1</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">service:</span><span>PayPal</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">shipping:</span><span>no</span>
                </li>
            </ul>
        </div>
@endsection