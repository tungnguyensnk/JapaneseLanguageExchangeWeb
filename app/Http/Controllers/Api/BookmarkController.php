<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookMark;
use App\Models\Post;
use App\Models\User;

class BookmarkController extends Controller
{
    public function index()
    {
        $bookmarks_id = BookMark::where('user_id', auth()->user()->id)->get();
        $bookmarks = [];
        foreach ($bookmarks_id as $bookmark_id) {
            $bookmark = Post::where('id', $bookmark_id->post_id)->first();
            $bookmark['user_name'] = User::where('id', $bookmark->user_id)->first()->name;
            unset($bookmark['content'], $bookmark['created_at'], $bookmark['updated_at'], $bookmark['views']);
            $bookmarks[] = $bookmark;
        }
        return response()->json([
            'message' => 'success',
            'data' => $bookmarks,
        ]);
    }
}
