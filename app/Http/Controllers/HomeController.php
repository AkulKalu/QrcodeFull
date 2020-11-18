<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
   
    // public function dd()
    // {
       
    //     $store = Auth::user()->stores()->find(1)->products()->create( ['description'=> "asd",
    //     'image_url'=> "dasd",
    //     'manufacturer'=> "asrd",
    //     'manufacturer_website'=> "assd",
    //     'name'=> "Tosters",
    //     'price'=> "400",
    //     'store_id'=> 1,
    //     'url'=> "asdd"]);
       
       
       
    //     dd( $store);
        
    // }
}
