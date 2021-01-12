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
                ]
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

        $stores = $user->stores();
        if($stores->count()) {
            $products = $stores->first()->products(); 
            $total = $products->count();
            
            if($total) {
                $response['products']['stats'] = [
                    'total'=>  $total,
                    'active'=> $products->where('active', '=', '1')->count(),
                    'categories'=>$products->distinct()->count('category')
                ];
                $response['products']['list'] = $products->all()->latest()->get();

                $transactions = $user->transactions();
                $total = $transactions->count();

                if($total) {
                    $response['transactions']['stats'] = [
                        'total'=>  $total,
                        'today'=> $transactions->whereDate('created_at', Carbon::today())->count(),
                        'this month'=>  $transactions->whereMonth('created_at', Carbon::today()->format('m'))->count(),
                    ];
                    $response['transactions']['list'] = $transactions->latest()->get();

                    $shippments = $user->shippments();
                    $response['shippments']['stats'] = [
                        'pending'=>  $shippments->where('shipped', '=', '0')->count(),
                        'sent'=>  $shippments->where('shipped', '=', '1')->count(),
                    ];
                    $response['shippments']['list'] = $shippments->latest()->get();
                }
            }
          
            $response['stores']['list'] = $stores->latest()->get();
           
          
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
