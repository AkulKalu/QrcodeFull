<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CPanelController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ShippmentsController;
use App\Http\Controllers\StoresController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TransactionsController;
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
// Route::get('/try', [CPanelController::class, 'load']);

Route::post('/products/activate/{id}', [ProductsController::class, 'toogleActive']);
Route::get('/user', [HomeController::class, 'load']);

Route::patch('/shippments/send/{id}', [ShippmentsController::class, 'markAsSent']);

Route::get('/shop/{store}/{productId}', [CheckoutController::class, 'index']);
Route::post('/checkout/charge/stripe/{productId}', [StripeController::class, 'charge']);
Route::get('/shop/{store}/{productId}/success_stripe', [StripeController::class, 'success']);
Route::get('/shop/{store}/{productId}/success_paypal', [PayPalController::class, 'success']);

Route::post('/checkout/charge/paypal_create', [PayPalController::class, 'create']);
Route::post('/checkout/charge/paypal_execute', [PayPalController::class, 'execute']);


Route::resources([
    'stores'=> StoresController::class,
    'products'=>ProductsController::class,
]);
