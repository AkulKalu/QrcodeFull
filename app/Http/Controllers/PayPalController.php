<?php

namespace App\Http\Controllers;

use App\Mail\TransactionSuccesfull;
use App\Models\Product;
use App\Models\Transaction as DBTransaction;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use PayPal\Api\Item;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
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
       $this->apiContext = new \PayPal\Rest\ApiContext(
        new \PayPal\Auth\OAuthTokenCredential(
            'AUpxNdBHo4kTJbc3W4itEx3BryDqLdUofE8i29de3Vmj0D4VAds_L31rUYo_YKBqN32HDUadnqUIpOoO',     // ClientID
            'EGOwfV6Hc_4gZciZvO975eCL2FvL463GbEKd8gt5HiTBrxHJBOYHT_x0ExEWbPS-j3cfs2_2-fsNIPag'      // ClientSecret
        )
    );
    }
 
    public function index()
    {
        return view('payment');
    }
    public function create(Request $request)
    {
        $product = Product::find($request->id);
        
        $payer = new Payer();
        $payer->setPaymentMethod("paypal");
    
        $item1 = new Item();
        $item1->setName( $product->manufacturer.' '.$product->category.' '.$product->model)
            ->setCurrency('USD')
            ->setQuantity($request->quantity)
            ->setSku($product->store->user->id.$product->store->id.$product->id)
            ->setPrice($product->price);
      
    
        $itemList = new ItemList();
        $itemList->setItems(array($item1));
    
    
        $amount = new Amount();
        $amount->setCurrency("USD")
            ->setTotal($product->price * $request->quantity);
    
    
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription("Payment description")
            ->setInvoiceNumber(uniqid());
    
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl(url('/shop/'.$product->store->name.'/'.$product->id.'/success_paypal'))
            ->setCancelUrl(url('/shop/'.$product->store->name.'/'.$product->id));

    
        // Add NO SHIPPING OPTION
        $inputFields = new InputFields();
        $inputFields->setNoShipping($request->delivery ? 0 : 1);
    
        $webProfile = new WebProfile();
        $webProfile->setName('test' . uniqid())->setInputFields($inputFields);
    
        $webProfileId = $webProfile->create($this->apiContext)->getId();
    
        $payment = new Payment();
        $payment->setExperienceProfileId($webProfileId); // no shipping
        $payment->setIntent("sale")
            ->setPayer($payer)
            ->setRedirectUrls($redirectUrls)
            ->setTransactions(array($transaction));
    
        try {
            $payment->create($this->apiContext);
        } catch (Exception $ex) {
            echo $ex;
            exit(1);
        }
    
        return $payment;
    }
    public function execute(Request $request)
    {
        
        $paymentId = $request->paymentID;
        $payment = Payment::get($paymentId, $this->apiContext);
    
        $execution = new PaymentExecution();
        $execution->setPayerId($request->payerID);
        $transaction = null;
        $shipping = null;

        try {
            $result = $payment->execute($execution, $this->apiContext);
            $payer = $result->payer->payer_info; 
            $shipping = $result->payer->payer_info->shipping_address; 
            $transInfo = $result->transactions[0]; 
            $product = Product::find($request->productId);

            $transaction = [
                'user_id'=> $product->store->user_id,
                'product_id'=> $product->id,
                'service'=> 'paypal',
                'transaction_id'=> $result->id,
                'customer_id'=>   $payer->payer_id,
                'customer_email'=>  $payer->email,
                'amount'=> $transInfo->amount->total ,
                'currency'=> $transInfo->amount->currency,
                'status'=> 'completed',
            ];
            $transaction = DBTransaction::create( $transaction);
            
            if($shipping) {
                $shipping = [
                    'user_id'=> $product->store->user_id,
                    'product_id'=> $product->id,
                    'name' => $payer->first_name.' '. $payer->last_name,
                    'email' => $payer->email,
                    'city' =>  $shipping->city,
                    'country'=> $shipping->country_code,
                    'line1' => $shipping->line1,
                    'state' => $shipping->state,
                    'postal_code'=> $shipping->postal_code,
                ];

                $transaction->shippment()->create($shipping);
            }

            Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull($transaction, $product, $transaction->shippment));
        
        } catch (Exception $ex) {
            echo $ex;
            exit(1);
        }
    
        return  $result;
    }

    public function success($store, $productId)
    {
        $product = Product::find( $productId);

        return view('product', [
            'purchaseCompleted' => 'PayPal',
            'product'=> $product, 
            'theme'=> $this->decodeTheme($product->theme), 
            'public_key'=> $product->store->stripe_public_key,
            ]);
    }
 
}
