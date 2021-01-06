<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {   
        $store = Auth::user()->stores()->find($request->storeId);
        $responseData = [];

        foreach ($store->products as $product) {
            $productData = $product->toArray();
            $productData['theme'] = unserialize($productData['theme']);
            array_push($responseData, $productData);
        }

        return response()->json(['products' => ['list'=> $responseData ]]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $store = Auth::user()->stores()->find( $request->store_id);
        $productData = $request->all();
        $productData = array_merge($productData, ['theme'=> serialize($request->theme)]);
        $createdProduct = $store->products()->create($productData);
        $createdProduct->theme = $request->theme;
        return response()->json(['created'=> $createdProduct]);
    }
   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        $product =Auth::user()->stores()->find($request->store_id)->products()->find($id);
        $productData = $request->all();
        $productData = array_merge($productData, ['theme'=> serialize($request->theme)]);
        $product->update($productData);
        $product->theme = $request->theme;
        return response()->json(['updated'=>$product]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $product =Auth::user()->stores()->find($request->store_id)->products()->find($id);
        $product->delete();
        return response()->json(['deleted'=> $id]);
    }
}
