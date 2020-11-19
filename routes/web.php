<?php

use App\Http\Controllers\CPanelController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\StoresController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/qrcodes/{store}/{product}', [CPanelController::class, 'generateQrCode'])->name('qrgen');
Route::post('/products/activate/{id}', [ProductsController::class, 'toogleActive']);
Route::get('/user', [CPanelController::class, 'load']);
Route::resources([
    'stores'=> StoresController::class,
    'products'=>ProductsController::class,
]);
