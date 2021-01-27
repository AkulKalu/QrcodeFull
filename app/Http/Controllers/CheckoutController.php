<?php

namespace App\Http\Controllers;

use App\Models\Product;


class CheckoutController extends Controller
{   
    public function index($store, $productId) {
        $product = Product::find($productId);

        return view('product', ['product'=> $product, 'theme'=> $this->decodeTheme($product->theme), 'public_key'=> $product->store->stripe_public_key]);
    }

}
