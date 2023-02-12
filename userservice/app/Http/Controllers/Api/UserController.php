<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //register new user
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        $user = new User([
            'id' => $request->id,
            'user_name' => $request->user_name ?? substr($request->email, 0, strpos($request->email, '@')),
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone ?? 0,
            'address' => $request->address ?? '',
            'role' => 1,
            'deleted' => 0,
            'avatar' => $request->avatar ?? '',
        ]);
        $user->save();
        $token = $user->createToken('Laravel Password Grant Client')->plainTextToken;

        return response()->json([
            'message' => 'Successfully created user!',
            'email' => $user->email,
            'token' => $token
        ], 201);
    }

    //login user
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $token = $user->createToken('Laravel Password Grant Client')->plainTextToken;
        return response()->json([
            'message' => 'Successfully logged in!',
            'email' => $user->email,
            'access_token' => $token
        ]);
    }

    //get profile
    public function profile(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'user' => $user
        ]);
    }

    //logout user
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    // get user by id
    public function getUser(Request $request): JsonResponse
    {
        $request->validate([
            'id' => 'required|integer'
        ]);
        $user = User::find($request->id);
        return response()->json([
            'user' => $user
        ]);
    }
}
