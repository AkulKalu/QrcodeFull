@extends('layouts.mail')

@section('content')
        <div class="title">
            <h2>{{$product->store->name}} - ORDER COMPLETED</h2>
        </div>
        
        <div class="message">
           <p> Dear {{$shipping ? $shipping->name : 'customer' }}. Thank you for doing buisness with us. If you have any questions or issues regearding 
               your order please contact us at <a href="mailto: {{$product->store->email}}">mail@gmail.com</a> 
               {{$product->store->phone ? 'or by phone at ( '.$product->store->phone.' )' : ''}}. Make sure you provide your order id
               in the email.
           </p>
        </div>
        <div class="info">
            <h4>ORDER:</h4>
            <ul class="list">
                <li class="data">
                    <span class="li-itm-title">id:</span><span>{{$order->transaction_id}}</span>
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
                    <span class="li-itm-title">service:</span><span>{{$order->service}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">shipping:</span><span>Yes</span>
                </li>
            </ul>
            <div class="amount">Total : {{$order->amount}}{{$product->currency}}</div>
        </div>
        @if ($shipping)
        <div class="info">
            <h4>SHIPPING ADDRESS:</h4>
            <ul class="list">
                <li class="data">
                    <span class="li-itm-title">name:</span><span>{{$shipping->name}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">city:</span><span>{{$shipping->city}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">country</span><span>{{$shipping->country}}</span>
                </li>
                @isset( $shipping->state )
                <li class="data">
                    <span class="li-itm-title">state:</span><span>{{$shipping->state}}</span>
                </li>
                @endisset
                <li class="data">
                    <span class="li-itm-title">ZIP Code</span><span>{{$shipping->postal_code}}</span>
                </li>
                <li class="data">
                    <span class="li-itm-title">address 1:</span><span>{{$shipping->line1}}</span>
                </li>
                @isset( $shipping->line2 )
                <li class="data">
                    <span class="li-itm-title">address 2:</span><span>{{$shipping->line2}}</span>
                </li>
                @endisset
                
            </ul>
        </div>
        @endif
@endsection