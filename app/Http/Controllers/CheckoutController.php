<?php

namespace App\Http\Controllers;

use App\Models\Product;


class CheckoutController extends Controller
{   
    public function index($store, $productId) {
        $product = Product::find($productId);

        //decode theme string
        $theme = explode('&', $product->theme);
        $theme = array_map(function($part) {
            return explode('|',$part);
        }, $theme);
        $theme = array_reduce($theme, function($array, $segment) {
            $array[$segment[0]] = $segment[1];
            return $array;
        });
        //

        return view('product', ['product'=> $product, 'theme'=> $theme, 'public_key'=> $product->store->stripe_public_key]);
    }

}
