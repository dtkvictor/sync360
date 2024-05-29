<?php

namespace App\Http\Requests\Address;

use App\Http\Requests\ApiFormRequest;

class CreateAddressRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->address()->count() < 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'state' => 'required|string|min:3|max:255',
            'city' => 'required|string|min:3|max:255',
            'neighborhood' => 'required|string|min:3|max:255',
            'street' => 'required|string|min:3|max:255',
        ];
    }
}
