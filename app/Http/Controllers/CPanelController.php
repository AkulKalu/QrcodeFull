<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CPanelController extends Controller
{
    public function load()
    {
        return response()->json(['user'=>  Auth::user()]);
    }

    public function generateQrCode($store, $product)
    {
        $store = Auth::user()->stores()->find($store);
        $product = $store->products()->find($product);
        $qrcode = QrCode::format('svg')->generate(url($store->name.'/'.$product->name.'/checkout'))->__toString(); 
        return response()->json(['qrCode'=> $qrcode]);
    }
}
