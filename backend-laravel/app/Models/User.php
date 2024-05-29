<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [        
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function address(): HasOne
    {
        return $this->hasOne(Address::class, 'user_id', 'id');
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class, 'user_id', 'id');
    }

    public function recoverPassword(): HasMany
    {        
        return $this->hasMany(SecurityCode::class, 'user_id', 'id');
    }

    public function createSecurityCode(string $type): string
    {
        $recover = new SecurityCode();
        $recover->user_id = $this->id;
        $recover->type = $type;
        $recover->code = uniqid();
        $recover->save();

        return $recover->code;
    }

    public function getUserByRecoverCode(string $code)
    {
        return ((new SecurityCode())->where('code', $code)->first())->user();
    }

    public function token(): void
    {
        if(isset($this->id) && !empty($this->id)) {
            $token = ($this->createToken('auth_token'))->plainTextToken;
            $this->attributes['token'] = $token;
        }else {
            $this->attributes['token'] = '';
        }
    }

    public function loadAll(): void
    {
        $this->load('profile');
        $this->load('address');
        $this->token();

        if(!empty($this->profile)) {
            $this->profile->getPictureUrl();
        }
    }


    public function verifyEmail(): void
    {
        $this->email_verified_at = Carbon::now();
        $this->save();
    }
}
