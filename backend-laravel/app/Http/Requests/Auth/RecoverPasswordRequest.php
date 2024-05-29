<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ApiFormRequest;
use App\Http\Requests\Commons\DefaultRules;

class RecoverPasswordRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return !auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [            
            'email' => [...DefaultRules::email()],
        ];
    }

    public function messages(): array 
    {
        return [
            ...parent::messages(),
            'email.exists' => ':attribute.not-found',
        ];
    }
}
