<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\LikePost;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PostController extends Controller
{
    //get 5 newest post not deleted or blocked
    public function getNewestPosts()
    {
        $posts = Post::where('deleted', 0)->where('locked', 0)->orderBy('id', 'desc')->take(5)->get();
        foreach ($posts as $post) {
            $post->time = Carbon::parse($post->updated_at)->locale('vi')->diffForHumans();
            unset($post->deleted, $post->locked, $post->content, $post->updated_at);
            $post['user_name'] = User::where('id', $post->user_id)->first()->name;

            $post['total_comment'] = Comment::where('post_id', $post->id)->count();
            $post['total_like'] = LikePost::where('post_id', $post->id)->count();
        }
        return response()->json([
            'message' => 'success',
            'data' => $posts,
        ]);
    }

    //get 50 update post not deleted or blocked
    public function getUpdatePosts()
    {
        $posts = Post::where('deleted', 0)->where('locked', 0)->orderBy('id', 'desc')->take(50)->get();
        foreach ($posts as $post) {
            $post->time = Carbon::parse($post->updated_at)->locale('vi')->diffForHumans();
            unset($post->deleted, $post->locked, $post->created_at);
            $post['user_name'] = User::where('id', $post->user_id)->first()->name;

            $comments = Comment::where('post_id', $post->id);
            $comments_parent = Comment::where('post_id', $post->id)->where('parent_id', null);
            $likes = User::select('users.id', 'users.name')->join('like_post', 'users.id', '=', 'like_post.user_id')->where('post_id', $post->id);

            $like = [
                'total' => $likes->count(),
                'list' => $likes->get(),
            ];

            $comment = [
                'total' => $comments->count(),
                'list_parent' => $comments_parent->get(),
            ];

            $post->like = $like;
            $post->comment = $comment;
        }
        return response()->json([
            'message' => 'success',
            'data' => $posts,
        ]);
    }
}
