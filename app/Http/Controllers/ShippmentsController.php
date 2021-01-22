<?php

namespace App\Http\Controllers;

use App\Mail\ShippmentSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ShippmentsController extends Controller
{
    public function markAsSent(Request $request, $id) {
        $shippment = Auth::user()->shippments()->find($id);
        $updated = $shippment->update([
            'shipped' => 1
        ]);
        if($updated) {
            $product = $shippment->product;
            $store = $product->store;
            Mail::to('krunaluka@gmail.com')->send(new ShippmentSent( $product, $shippment, $store));
            return response()->json(['shippment'=> $shippment]);
        }

    }
}
