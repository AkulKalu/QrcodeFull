<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
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
            'manufacturer_website'=> ['url'],
            'name'=> ['required'],
            'image_url'=> ['url'],
            'url'=> ['url'],
            'price'=> ['required','numeric'],
        ];
    }
}
