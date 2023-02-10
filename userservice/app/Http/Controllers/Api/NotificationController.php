<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Carbon\Carbon;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications_id = Notification::where('user_id', auth()->user()->id)->get();
        foreach ($notifications_id as $notification) {
            $notification->time = Carbon::parse($notification->created_at)->locale('vi')->diffForHumans();
            unset($notification->user_id);
        }
        return response()->json([
            'message' => 'success',
            'data' => $notifications_id,
        ]);
    }
}
