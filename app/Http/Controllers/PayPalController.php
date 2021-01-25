<?php

namespace App\Http\Controllers;

use App\Mail\TransactionSuccesfull;
use App\Models\Product;
// use App\Models\Transaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Omnipay\Omnipay;

use PayPal\Api\Item;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Payment;
use PayPal\Api\ItemList;
use PayPal\Api\WebProfile;
use PayPal\Api\InputFields;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\PaymentExecution;

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
    public function create()
    {
        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                'AUpxNdBHo4kTJbc3W4itEx3BryDqLdUofE8i29de3Vmj0D4VAds_L31rUYo_YKBqN32HDUadnqUIpOoO',     // ClientID
                'EGOwfV6Hc_4gZciZvO975eCL2FvL463GbEKd8gt5HiTBrxHJBOYHT_x0ExEWbPS-j3cfs2_2-fsNIPag'      // ClientSecret
            )
        );
    
        $payer = new Payer();
        $payer->setPaymentMethod("paypal");
    
        $item1 = new Item();
        $item1->setName('Ground Coffee 40 oz')
            ->setCurrency('USD')
            ->setQuantity(1)
            ->setSku("123123") // Similar to `item_number` in Classic API
            ->setPrice(7.5);
        $item2 = new Item();
        $item2->setName('Granola bars')
            ->setCurrency('USD')
            ->setQuantity(5)
            ->setSku("321321") // Similar to `item_number` in Classic API
            ->setPrice(2);
    
        $itemList = new ItemList();
        $itemList->setItems(array($item1, $item2));
    
        $details = new Details();
        $details->setShipping(1.2)
            ->setTax(1.3)
            ->setSubtotal(17.50);
    
        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal(20)
            ->setDetails($details);
    
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription("Payment description")
            ->setInvoiceNumber(uniqid());
    
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(url('/checkout/success/paypal'))
            ->setCancelUrl(url('/checkout/fail'));

    
        // Add NO SHIPPING OPTION
        $inputFields = new InputFields();
        $inputFields->setNoShipping(0);
    
        $webProfile = new WebProfile();
        $webProfile->setName('test' . uniqid())->setInputFields($inputFields);
    
        $webProfileId = $webProfile->create($apiContext)->getId();
    
        $payment = new Payment();
        $payment->setExperienceProfileId($webProfileId); // no shipping
        $payment->setIntent("sale")
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions(array($transaction));
    
        try {
            $payment->create($apiContext);
        } catch (Exception $ex) {
            echo $ex;
            exit(1);
        }
    
        return $payment;
    }
    public function execute(Request $request)
    {
        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                'AUpxNdBHo4kTJbc3W4itEx3BryDqLdUofE8i29de3Vmj0D4VAds_L31rUYo_YKBqN32HDUadnqUIpOoO',     // ClientID
                'EGOwfV6Hc_4gZciZvO975eCL2FvL463GbEKd8gt5HiTBrxHJBOYHT_x0ExEWbPS-j3cfs2_2-fsNIPag'      // ClientSecret
            )
        );
    
        $paymentId = $request->paymentID;
        $payment = Payment::get($paymentId, $apiContext);
    
        $execution = new PaymentExecution();
        $execution->setPayerId($request->payerID);
    
        // $transaction = new Transaction();
        // $amount = new Amount();
        // $details = new Details();
    
        // $details->setShipping(2.2)
        //     ->setTax(1.3)
        //     ->setSubtotal(17.50);
    
        // $amount->setCurrency('USD');
        // $amount->setTotal(21);
        // $amount->setDetails($details);
        // $transaction->setAmount($amount);
    
        // $execution->addTransaction($transaction);
    
        try {
            $result = $payment->execute($execution, $apiContext);
        } catch (Exception $ex) {
            echo $ex;
            exit(1);
        }
    
        return $result;
    }
 
    // public function charge(Request $request)
    // {
    //     $product = Product::find($request->productId);
      
    //     $this->gateway->setClientId($product->store->paypal_client_id);
    //     $this->gateway->setSecret($product->store->paypal_private_key);

    //     try {
    //         $response = $this->gateway->purchase(array(
    //             'amount' =>  $product->price,
    //             'currency' => 'USD',
    //             'returnUrl' => url('/checkout/success/paypal?product_id='.$product->id),
    //             'cancelUrl' => url('/checkout/fail'),
    //         ))->send();
        
    //         if ($response->isRedirect()) {
    //             $response->redirect(); // this will automatically forward the customer
    //         } else {
    //             // not successful
    //             return $response->getMessage();
    //         }
    //     } catch(Exception $e) {
    //         return $e->getMessage();
    //     }
        
    // }
 
    // public function success(Request $request)
    // {
    //     // Once the transaction has been approved, we need to complete it.
    //     if ($request->input('paymentId') && $request->input('PayerID'))
    //     {
    //         $product = Product::find($request->query()['product_id']);
    //         $this->gateway->setClientId($product->store->paypal_client_id);
    //         $this->gateway->setSecret($product->store->paypal_private_key);
           
    //         $transaction = $this->gateway->completePurchase(array(
    //             'payer_id'             => $request->input('PayerID'),
    //             'transactionReference' => $request->input('paymentId'),
    //         ));
    //         $response = $transaction->send();
         
    //         if ($response->isSuccessful())
    //         {
    //             // The customer has successfully paid.
    //             $data = $response->getData();

    //             $transaction = [
    //                 'user_id'=> $product->store->user_id,
    //                 'service'=> 'paypal',
    //                 'transaction_id'=> $data['id'],
    //                 'customer_id'=>   $data['payer']['payer_info']['payer_id'],
    //                 'customer_email'=>  $data['payer']['payer_info']['email'],
    //                 'amount'=> $data['transactions'][0]['amount']['total'] ,
    //                 'currency'=>$data['transactions'][0]['amount']['currency'],
    //                 'status'=>$data['transactions'][0]['related_resources']['0']['sale']['state'],
    //             ];
               
    //             $shipping =  $data['payer']['payer_info']['shipping_address'];
    //             $shipping['name'] =  $shipping['recipient_name'];
    //             unset($shipping['recipient_name']);
    //             $shipping['country'] =  $shipping['country_code'];
    //             unset($shipping['country_code']);

    //             $transaction = Transaction::create( $transaction);
    //             $transaction->shippment()->create($shipping);
                
    //             Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull($transaction, $product, $transaction->shippment));
    //             return view('checkout.success');
    //         } else {
    //             return $response->getMessage();
    //         }
    //     } else {
    //         return 'Transaction is declined';
    //     }
    // }
 
    // public function fail()
    // {
    //     return view('checkout.fail');
    // }
}
