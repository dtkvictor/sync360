<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function uploadProfilePicture(UploadedFile|null $file)
    {
        if(!empty($file)) {
            $path = $file->store('/user/profile/picture');
            $this->attributes['picture'] = $path;
        }
    }

    public function deleteProfilePicture()
    {
        $path = $this->getAttribute('picture') ?? '';

        if(Storage::exists($path)) {
            Storage::delete($path);
        }
    }

    public function getPictureUrl()
    {
        if(empty($this->getAttribute('picture'))) return;
        $this->attributes['picture'] = Storage::url($this->getAttribute('picture'));    
    }
}
