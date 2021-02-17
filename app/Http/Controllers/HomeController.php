<?php

namespace App\Http\Controllers;

use App\Mail\ShippmentSent;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;



class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function load()
    {   
        $user = Auth::user();
        $response = [
            'user'=> $user,
            'stores' => [
                'all' => [], 
                'new' =>  [
                    'name' => '',
                    'website' =>'https://',
                    'email' => '',
                    'phone' => '',
                    'stripe_public_key' => '',
                    'stripe_private_key' => '',
                    'paypal_client_id' => '',
                    'paypal_private_key' => '',
                ],
            ],
            'products' => [
                'all' => [], 
                'new' =>  [
                    'category'=> '',
                    'model'=> '',
                    'manufacturer'=> '',
                    'image_url'=>'https://',
                    'url'=>'https://',
                    'price'=> 0,
                    'description'=>'',
                    'active'=> 1,
                    'shipping'=> 1,
                    'stock'=> 1,
                    'currency'=> '$',
                    'theme' => 'image|rgb(255, 255, 255, 1)&font|rgb(16, 17, 17, 1)&background|rgb(255, 255, 255, 1)&buttons|rgb(16, 17, 17, 1)'
                ],
                'stats'=> [
                    'total'=> 0,
                    'active'=> 0,
                    'categories'=>0.
                ],
                'categories' => []
            ],
            'transactions' => [
                'all' => [],
                'stats' => [
                    'total'=>  0,
                    'today'=> 0,
                    'this month'=>  0,
                ]
            ],
            'shippments' => [
                'all' => [],
                'stats'=> [
                    'pending'=>  0,
                    'sent'=>  0,
                ]
            ],
        ];
       
        if($user->stores()->count()) {
            $response['stores']['all'] = $user->stores()->latest()->get();
          
            $store = $user->stores()->latest()->first(); 
            
            if($store->products()->count()) {
                $response['products']['all'] =$store->products()->latest()->get();
                $response['products']['stats'] = $this->getProductsStats($store);
                $response['products']['categories'] = $this->getProductCategories($store);
            }
            if($user->transactions()->count()) {
                $response['transactions']['all'] = $user->transactions()->latest()->get();
                $response['transactions']['stats'] = $this->getTransactionsStats($user);
                $response['shippments']['all'] = $user->shippments()->latest()->get();
                $response['shippments']['stats'] = $this->getShippmentsStats($user);
            }
        }
        return response()->json($response);
    }
    public function try()
    {
        $product =Product::find(1);
        $transaction = Transaction::find(1);
        
        Mail::to('krunaluka@gmail.com')->send(new ShippmentSent( $product,  $transaction->shippment));
       
    }

}
