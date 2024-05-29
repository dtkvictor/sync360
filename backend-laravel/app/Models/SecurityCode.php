<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SecurityCode extends Model
{
    use HasFactory;

    protected $table = 'security_code';

    public static function getTypes(): array
    {
        return ['recover_password', 'verify_email'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    public function isValid(string $type, string $code): bool
    {
        $code = $this->where('code', $code)
                     ->where('type', $type)
                     ->whereNotNull('user_id')
                     ->orderBy('code', 'ASC')
                     ->first();

        if($code) {            
            $minutes = now()->diffInMinutes($code->created_at);
            return $minutes <= 10;
        }

        return false;
    }
}
