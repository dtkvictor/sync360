<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\SecurityCode;

class ValidateUserSecurityCodeRule implements ValidationRule
{
    public function __construct(
        public string $type,
    ){}
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {                    
        if((new SecurityCode())->isValid($this->type, $value)) return;
        $fail('code.invalid');
    }
}
