@extends('layouts.mail')

@section('content')
        <div class="title">
            <h2>{{$product->store->name}} - ORDER SHIPPED</h2>
        </div>
        <div class="message">
           <p> Hello {{$shippment->name}}. We are happy to notify you that your order {{$product->manufacturer}} - {{$product->category}} {{$product->model}}
               has been sent your way. You can expect delivery in the next few days.
               
           </p>
           <p>
               If you have any questions please contact us at <a href="mailto: {{$product->store->email}}">mail@gmail.com</a> 
               {{$product->store->phone ? 'or by phone at ( '.$product->store->phone.' )' : ''}}.
           </p>
        </div>
       
@endsection