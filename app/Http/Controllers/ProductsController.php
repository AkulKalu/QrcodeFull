<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
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
        return response()->json($store->products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $store = Auth::user()->stores()->find($request->store_id);
        $createdProduct = $store->products()->create($request->all());
        return response()->json($createdProduct);
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
        $product->update($request->all());
        return response()->json($product);
    }
    public function toogleActive(Request $request, $id)
    {
        $product =Auth::user()->stores()->find($request->store_id)->products()->find($id);
        $product->update($request->all());
        return response()->json($product);
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
        return response()->json(['deleted' => true]);
    }
}
