<?php

namespace App\Http\Controllers;

use App\Mail\TransactionSuccesfull;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
    public function try()
    {
        // Mail::to('krunaluka@gmail.com')->send(new TransactionSuccesfull([]));
        return view('mail.order_completed');
    }

}
