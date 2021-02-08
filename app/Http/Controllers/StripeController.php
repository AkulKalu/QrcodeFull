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
    public function charge(Request $request, $productId)
    {
        $product = Product::find($productId);
        Stripe::setApiKey($product->store->stripe_private_key);
        $success_url = url('/shop/'.urlencode($product->store->name).'/'.$product->id.'/success_stripe'.'?session_id={CHECKOUT_SESSION_ID}');
        $cancel_url = url('/shop/'.urlencode($product->store->name).'/'.$product->id);
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
              'quantity' => $request->quantity,
            ]],
            'mode' => 'payment',
            'success_url' =>  $success_url,
            'cancel_url' =>  $cancel_url,
          ]);
          return response()->json(['id'=> $checkout_session->id, 'ss'=> $success_url]);
       
    }
   
    public function success(Request $request, $store, $productId) {

        $product = Product::find($productId);
        Stripe::setApiKey( $product->store->stripe_private_key);
        $session = StripeSession::retrieve($request->query()['session_id']);
        $customer = Customer::retrieve( $session->customer);

        $transaction = [
          'user_id'=> $product->store->user_id,
          'product_id'=> $product->id,
          'service'=> 'stripe',
          'transaction_id'=> $session->id,
          'customer_id'=>  $customer->id,
          'customer_email'=>  $customer->email,
          'amount'=> $session->amount_total / 100 ,
          'currency'=> strtoupper($session->currency),
          'status'=>'completed',
        ];
        $transaction = Transaction::create($transaction);

        $shipping = null;

        if( $session->shipping ) {
          
          $shipping = json_decode(json_encode($session->shipping->address), true);
          $shipping['user_id'] = $product->store->user_id;
          $shipping['product_id'] = $product->id;
          $shipping['email'] =  $customer->email;
          $shipping['name'] = $session->shipping->name;
          $shipping =  $transaction->shippment()->create($shipping);
        }
        
        Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull($transaction, $product,  $shipping ));

        return view('product', [
          'purchaseCompleted' => 'Stripe',
          'product'=> $product, 
          'theme'=> $this->decodeTheme($product->theme), 
          'public_key'=> $product->store->stripe_public_key,
          ]);
    }

    

}
