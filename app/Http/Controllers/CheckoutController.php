<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Omnipay\Omnipay;
use Stripe\Checkout\Session as StripeSession;

class CheckoutController extends Controller
{
    public function index($user, $store,$storeId, $productId) {
        $product = Product::find($productId);
        return view('product', ['product'=> $product, 'theme'=> unserialize($product->theme), 'public_key'=> $product->store->stripe_public_key]);
    }

    public function chargeWithStripe($productId)
    {
        $product = Product::find($productId);
        Stripe::setApiKey($product->store->stripe_private_key);
  
        $checkout_session = StripeSession::create([
            'payment_method_types' => ['card'],
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
            'success_url' => url('/checkout/success?session_id={CHECKOUT_SESSION_ID}'),
            'cancel_url' =>  url('/checkout/fail'),
          ]);
    

        return response()->json(['id'=> $checkout_session->id]);
    }
    public function chargeWithPaypal(Request $request)
    {
        $product = Product::find($request->productId);
        $payPal = Omnipay::create('PayPal_Rest');
        $payPal->setClientId($product->store->paypal_client_id);
        $payPal->setSecret($product->store->paypal_private_key);
        $payPal->setTestMode(true);
       
        try {
            $response = $payPal->purchase(array(
                'amount' => $product->price,
                'currency' => 'USD',
                'returnUrl' => url('/checkout/success'),
                'cancelUrl' => url('/checkout/fail'),
            ))->send();
        
            if ($response->isRedirect()) {
                $response->redirect(); // this will automatically forward the customer
            } else {
                // not successful
                return $response->getMessage();
            }
        } catch(Exception $e) {
            return $e->getMessage();
        }
        
    }
    public function success() {
     
        return view('checkout.success');
    }
    public function fail() {

        return view('checkout.fail');
    }


}
