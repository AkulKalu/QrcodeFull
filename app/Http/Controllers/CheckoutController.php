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
     
        $product = Store::find($storeId)->products()->find($productId);
        return view('product', ['product'=> $product]);
    }

    public function chargeWithStripe($productId)
    {
        $product = Product::find($productId);

        Stripe::setApiKey('sk_test_51HYvFzDtXqe1Qv3CNrtwR3SKkqAHAetQxiuAwYwHn0SkziWTX2yIPT7rgXfrojEbyGtVv6t6XAZqUv0l5tfKJM9e00Po8QFveX');
  
        $checkout_session = StripeSession::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
              'price_data' => [
                'currency' => 'usd',
                'unit_amount' =>  $product->price,
                'product_data' => [
                  'name' => $product->name,
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
        $payPal->setClientId('AS-eqCp9M-RCJp9Vsk5s3hbPFsn14JxUKEO6O5qED-cS9fuus4B_cVtJTCqeSdL2w0M11j4YQ6zcKLTZ');
        $payPal->setSecret('EJSPyDXcGJ_2hYiUaCm9B8eedPk_FMDDP46xcSJBY2CZ9k_M6ox4g0lhViTXLAn2Sm88dD0J0BbV6MO_');
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
