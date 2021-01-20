<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequest;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoresController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stores = Auth::user()->stores()->get();

        return response()->json($stores);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $store = Auth::user()->stores()->create($request->all());

         return response()->json([
             'created' => $store,
             'all' =>  Auth::user()->stores()->latest()->get()
             ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRequest $request, $id)
    {
        $store = Auth::user()->stores()->find($id);
        $status = $store->update($request->all());
        if($status) {
            return response()->json([
                'updated' => $store,
                'all' =>  Auth::user()->stores()->latest()->get(),
                ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
       
        $store = Auth::user()->stores()->find($id);
        $store->products()->delete();
        $store->delete();
        $response = [
            'stores' => [
                'all' =>  Auth::user()->stores()->latest()->get(),
            ],
        ];
        if($request->active) {
            $newActive = Auth::user()->stores()->latest()->first();
            $response['products'] = [
                'all'=> $newActive->products()->latest()->get(),
                'stats' => $this->getProductsStats($newActive),
            ];
            $response['stores']['active'] = $newActive;
        }
        return response()->json($response); 
    }
}
