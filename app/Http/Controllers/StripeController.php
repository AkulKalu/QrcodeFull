<?php

namespace App\Http\Controllers;

use App\Mail\TransactionSuccesfull;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Customer;

class StripeController extends Controller
{   
    public function charge($productId)
    {
        $product = Product::find($productId);
        Stripe::setApiKey($product->store->stripe_private_key);
  
        $checkout_session = StripeSession::create([
            'payment_method_types' => ['card'],
            'shipping_address_collection'=> [
              'allowed_countries' => [
                'US','CA'
              ]
            ],
            'line_items' => [[
              'price_data' => [
                'currency' => 'usd',
                'unit_amount' =>  $product->price * 100,
                'product_data' => [
                  'name' => $product->model,
                  'images' => [$product->image_url],
                ],
              ],
              'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => url('/checkout/success/stripe?session_id={CHECKOUT_SESSION_ID}&product_id='.$product->id),
            'cancel_url' =>  url('/checkout/fail'),
          ]);
    
        return response()->json(['id'=> $checkout_session->id]);
    }
   
    public function success(Request $request) {

        $product = Product::find($request->query()['product_id']);
        Stripe::setApiKey( $product->store->stripe_private_key);
        $session = StripeSession::retrieve($request->query()['session_id']);
        $customer = Customer::retrieve( $session->customer);

        $transaction = [
          'user_id'=> $product->store->user_id,
          'service'=> 'stripe',
          'transaction_id'=> $session->id,
          'customer_id'=>  $customer->id,
          'customer_email'=>  $customer->email,
          'amount'=> $session->amount_total / 100 ,
          'currency'=> $session->currency,
          'status'=>$session->payment_status,
        ];
        $transaction = Transaction::create($transaction);

        $shipping = null;

        if( $session->shipping ) {
          $shipping = json_decode(json_encode($session->shipping->address), true);
          $shipping['name'] = $session->shipping->name;
          $shipping =  $transaction->shippment()->create($shipping);
        }
        
        Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull($transaction, $product,  $shipping ));

        return view('checkout.success');
    }

    public function fail() {

        return view('checkout.fail');
    }

}
