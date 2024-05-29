<?php

namespace App\Http\Requests\User;


use App\Http\Requests\ApiFormRequest;
use App\Http\Requests\Commons\DefaultRules;

class UpdateUserRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'email' => DefaultRules::email(),
            'password' => DefaultRules::password()
        ];
    }
}
