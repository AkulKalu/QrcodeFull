<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class TransactionsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() 
    {
        return response()->json(Auth::user()->transactions);
    }
}
