<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CPanelController extends Controller
{
    public function load()
    {   
        $user = Auth::user();
        $response = [
            'user'=> $user,
            'stores' => [
                'all' => [], 
                'new' =>  [
                    'name' => 'SomeStore',
                    'website' =>'https://i.gadgets360cdn.com/',
                    'email' => 'asd@asd.com',
                    'phone' => '123123',
                    'stripe_public_key' => 'asd',
                    'stripe_private_key' => 'asd',
                    'paypal_client_id' => 'asd',
                    'paypal_private_key' => 'asd',
                ],
            ],
            'products' => [
                'all' => [], 
                'new' =>  [
                    'category'=> 'TV',
                    'model'=> 'asd',
                    'manufacturer'=> 'asd',
                    'image_url'=>'https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg',
                    'url'=>'https://i.gadgets360cdn.com/products/large/realme-smart-tv-43-db-800x450-1590390507.jpg',
                    'price'=> 700,
                    'description'=>'asd',
                    'active'=> true,
                    'shipping'=> true,
                    'stock'=> 1,
                    'currency'=> '$',
                    'theme' => 'image|rgb(255, 255, 255, 1)&font|rgb(196, 235, 108, 1)&background|rgb(16, 17, 17, 1)&buttons|rgb(196, 235, 108, 1)'
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

                if($user->transactions()->count()) {
                    $response['transactions']['all'] = $user->transactions()->latest()->get();
                    $response['transactions']['stats'] = $this->getTransactionsStats($user);
                    $response['shippments']['all'] = $user->shippments()->latest()->get();
                    $response['shippments']['stats'] = $this->getShippmentsStats($user);
                }
            }
        }
    
        return response()->json($response);
    }

    public function generateQrCode($store, $product)
    {
        $store = Auth::user()->stores()->find($store);
        $product = $store->products()->find($product);
        $qrcode = QrCode::format('svg')->generate(url($store->name.'/'.$product->name.'/checkout'))->__toString(); 
        return response()->json(['qrCode'=> $qrcode]);
    }
}
