<?php

namespace App\Http\Controllers;

use App\Mail\TransactionSuccesfull;
use App\Models\Product;
use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Omnipay\Omnipay;
class PayPalController extends Controller
{
    public $gateway;
 
    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setTestMode(true);
    }
 
    public function index()
    {
        return view('payment');
    }
 
    public function charge(Request $request)
    {
        $product = Product::find($request->productId);
      
        $this->gateway->setClientId($product->store->paypal_client_id);
        $this->gateway->setSecret($product->store->paypal_private_key);

        try {
            $response = $this->gateway->purchase(array(
                'amount' =>  $product->price,
                'currency' => 'USD',
                'returnUrl' => url('/checkout/success/paypal?product_id='.$product->id),
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
 
    public function success(Request $request)
    {
        // Once the transaction has been approved, we need to complete it.
        if ($request->input('paymentId') && $request->input('PayerID'))
        {
            $product = Product::find($request->query()['product_id']);
            $this->gateway->setClientId($product->store->paypal_client_id);
            $this->gateway->setSecret($product->store->paypal_private_key);

            $transaction = $this->gateway->completePurchase(array(
                'payer_id'             => $request->input('PayerID'),
                'transactionReference' => $request->input('paymentId'),
            ));
            $response = $transaction->send();
         
            if ($response->isSuccessful())
            {
                // The customer has successfully paid.
                $transaction = $response->getData();
                $transaction = [
                    'user_id'=> $product->store->user_id,
                    'service'=> 'paypal',
                    'transaction_id'=> $transaction['id'],
                    'customer_id'=>   $transaction['payer']['payer_info']['payer_id'],
                    'customer_email'=>  $transaction['payer']['payer_info']['email'],
                    'amount'=> $transaction['transactions'][0]['amount']['total'] ,
                    'currency'=>$transaction['transactions'][0]['amount']['currency'],
                    'status'=>$transaction['transactions'][0]['related_resources']['0']['sale']['state'],
                ];
                
                Transaction::create($transaction);
                Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull($transaction, $product));
                return view('checkout.success');
            } else {
                return $response->getMessage();
            }
        } else {
            return 'Transaction is declined';
        }
    }
 
    public function fail()
    {
        return view('checkout.fail');
    }
}
