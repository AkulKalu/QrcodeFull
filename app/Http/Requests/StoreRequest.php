<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=> ['required'],
            'website'=>['url'],
            'stripe_public_key'=>['required'],
            'stripe_private_key'=>['required'],
            'paypal_client_id'=>['required'],
            'paypal_private_key'=>['required'],
        ];
    }
}
