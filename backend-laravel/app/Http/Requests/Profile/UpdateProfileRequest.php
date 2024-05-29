<?php

namespace App\Http\Requests\Profile;

class UpdateProfileRequest extends CreateProfileRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->profile->count() > 1;
    }
}
