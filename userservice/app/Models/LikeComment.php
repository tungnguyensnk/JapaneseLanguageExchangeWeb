<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LikeComment extends Model
{
    use HasFactory;

    protected $table = 'like_comment';
    protected $fillable = [
        'user_id',
        'comment_id'
    ];
}
