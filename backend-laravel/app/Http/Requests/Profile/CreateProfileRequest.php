<?php

namespace App\Http\Requests\Profile;

use App\Http\Requests\ApiFormRequest;

class CreateProfileRequest extends ApiFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->profile()->count() < 1;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'picture' => 'nullable|image',
            'name' => 'required|string|min:3|max:255',
            'birth_date' => 'required|date',
            'gender' => 'required|string|in:male,famale,other',
            'cell_number' => 'required|numeric|digits:11',
            'about_me' => 'required|string|min:3|max:255',
        ];
    }
}
