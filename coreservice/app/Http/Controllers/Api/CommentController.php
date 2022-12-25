<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use Carbon\Carbon;

class CommentController extends Controller
{
    public function getChildComment($id)
    {
        $comments = Comment::where('parent_id', $id)->get();
        foreach ($comments as $comment) {
            $comment->time = Carbon::parse($comment->updated_at)->locale('vi')->diffForHumans();
            unset($comment->parent_id, $comment->post_id);
            $comment['user_name'] = User::where('id', $comment->user_id)->first()->name;
        }
        return response()->json([
            'message' => 'success',
            'data' => $comments,
        ]);
    }
}
