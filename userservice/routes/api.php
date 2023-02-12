<?php

use App\Http\Controllers\Api\BookmarkController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::get('user/{id}', [UserController::class, 'getUser']);
Route::middleware('auth:sanctum')->get('profile', [UserController::class, 'profile']);
Route::middleware('auth:sanctum')->post('logout', [UserController::class, 'logout']);
Route::middleware('auth:sanctum')->post('bookmark', [BookmarkController::class, 'index']);
Route::middleware('auth:sanctum')->get('notification', [NotificationController::class, 'index']);
Route::get('newpost', [PostController::class, 'getNewestPosts']);
Route::get('post', [PostController::class, 'getUpdatePosts']);
Route::get('childcomment/{id}', [CommentController::class, 'getChildComment']);
