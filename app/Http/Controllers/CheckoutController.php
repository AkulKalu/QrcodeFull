<?php

namespace App\Http\Controllers;

use App\Models\Product;


class CheckoutController extends Controller
{   
    public function index($user, $store,$storeId, $productId) {
        $product = Product::find($productId);
        return view('product', ['product'=> $product, 'theme'=> unserialize($product->theme), 'public_key'=> $product->store->stripe_public_key]);
    }

}
