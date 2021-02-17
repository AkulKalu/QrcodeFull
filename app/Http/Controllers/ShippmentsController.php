<?php

namespace App\Http\Controllers;

use App\Mail\ShippmentSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ShippmentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function markAsSent(Request $request, $id) {
        $shippment = Auth::user()->shippments()->find($id);
        $updated = $shippment->update([
            'shipped' => 1
        ]);
        if($updated) {
            $product = $shippment->product;
            Mail::to('krunaluka@gmail.com')->send(new ShippmentSent( $product, $shippment));
            return response()->json(['stats'=> $this->getShippmentsStats(Auth::user()), 'all' => Auth::user()->shippments()->latest()->get()]);
        }

    }
}
