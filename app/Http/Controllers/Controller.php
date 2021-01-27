<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getProductsStats($store) {
        return [
            'total'=>  $store->products()->count(),
            'active'=>$store->products()->where('active', '=', '1')->count(),
            'categories'=> $store->products()->distinct('category')->count(),
        ];
    }

    public function getProductCategories($store) {
        $categories = $store->products()->distinct('category')->get('category')->toArray();
        return  array_map(fn($prod) =>$prod['category'], $categories);
    }

    public function getTransactionsStats($user) {
        return  [
            'total'=>  $user->transactions()->count(),
            'today'=> $user->transactions()->whereDate('created_at', Carbon::today())->count(),
            'this month'=>  $user->transactions()->whereMonth('created_at', Carbon::today()->format('m'))->count(),
        ];
    }
    public function getShippmentsStats($user) {
        return [
            'pending'=>  $user->shippments()->where('shipped', '=', '0')->count(),
            'sent'=>  $user->shippments()->where('shipped', '=', '1')->count(),
        ];
    }

    public function decodeTheme($themeStr)
    {
        $theme = explode('&', $themeStr);
        $theme = array_map(function($part) {
            return explode('|',$part);
        }, $theme);
        $theme = array_reduce($theme, function($array, $segment) {
            $array[$segment[0]] = $segment[1];
            return $array;
        });
        return $theme;
    }
}
