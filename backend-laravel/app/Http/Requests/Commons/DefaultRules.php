<?php

namespace App\Http\Requests\Commons;

class DefaultRules
{
    public static function email(): array
    {
        return ['required', 'email', 'max:255'];
    }

    public static function password(): array
    {
        return [ 'required', 'string', 'min:8', 'max:255', 'confirmed' ];
    }
}