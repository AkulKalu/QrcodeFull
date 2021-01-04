<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CPanelController extends Controller
{
    public function load()
    {   
        $user = Auth::user();
        $stores = $user->stores()->latest()->get();
        $storeTemplate = [
            'name' => '',
            'website' =>'',
            'email' => '',
            'phone' => '',
            'stripe_public_key' => '',
            'stripe_private_key' => '',
            'paypal_client_id' => '',
            'paypal_private_key' => '',
        ];

       
        return response()->json([
            'user'=> $user,
            'stores' => ['list' => $stores, 'new' =>  $storeTemplate],

        ]);
    }

    public function generateQrCode($store, $product)
    {
        $store = Auth::user()->stores()->find($store);
        $product = $store->products()->find($product);
        $qrcode = QrCode::format('svg')->generate(url($store->name.'/'.$product->name.'/checkout'))->__toString(); 
        return response()->json(['qrCode'=> $qrcode]);
    }
}
