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
        return response()->json([
            'products' => [
                'list'=> $store->products()->latest()->get(),
                'stats' => $this->getProductsStats($store),
                'categories'=> $this->getProductCategories($store),
                ]
            ]);
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
        $createdProduct = $store->products()->create($request->all());
        return response()->json([
            'created'=> $createdProduct,
            'stats' => $this->getProductsStats($store),
            'categories'=> $this->getProductCategories($store),
            ]);
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
        $store = Auth::user()->stores()->find( $request->store_id);
        $product = $store->products()->find($id);
        $product->update($request->all());
        return response()->json([
            'updated'=>$product,
            'stats' => $this->getProductsStats($store),
            'categories'=> $this->getProductCategories($store),
            ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $store = Auth::user()->stores()->find($request->store_id);
        $product = $store->products()->find($id);
        $product->delete();
        return response()->json([
            'deleted'=> $id,
            'stats' => $this->getProductsStats($store),
            'categories'=> $this->getProductCategories($store),
            ]);
    }
}
