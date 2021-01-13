<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
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
                'list' => [], 
                'new' =>  [
                    'name' => '',
                    'website' =>'',
                    'email' => '',
                    'phone' => '',
                    'stripe_public_key' => '',
                    'stripe_private_key' => '',
                    'paypal_client_id' => '',
                    'paypal_private_key' => '',
                ],
            ],
            'products' => [
                'list' => [], 
                'new' =>  [
                    'category'=> '',
                    'model'=> '',
                    'manufacturer'=> '',
                    'image_url'=>'',
                    'url'=>'',
                    'price'=> 0,
                    'description'=>'',
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
                'list' => [],
                'stats' => [
                    'total'=>  0,
                    'today'=> 0,
                    'this month'=>  0,
                ]
            ],
            'shippments' => [
                'list' => [],
                'stats'=> [
                    'pending'=>  0,
                    'sent'=>  0,
                ]
            ],
        ];
       
        if($user->stores()->count()) {
            $response['stores']['list'] = $user->stores()->latest()->get();
            $store = $user->stores()->first(); 

            if($store->products()->count()) {
                $response['products']['list'] =$store->products()->latest()->get();
                $response['products']['stats'] = $this->getProductsStats($store);
                $response['products']['categories'] = $this->getProductCategories($store);

                if($user->transactions()->count()) {
                    $response['transactions']['list'] = $user->transactions()->latest()->get();
                    $response['transactions']['stats'] = $this->getTransactionsStats($user);
                    $response['shippments']['list'] = $user->shippments()->latest()->get();
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
