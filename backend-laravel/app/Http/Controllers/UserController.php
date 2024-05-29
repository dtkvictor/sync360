<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\User\DeleteUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $user->loadAll(); 
        
        return response(new UserResource($user), 200);
    }
    
    public function update(UpdateUserRequest $request): Response
    {
        $user = Auth::user();
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();

        return response(new UserResource($user), 201);
    }

    public function destroy(DeleteUserRequest $request): Response
    {
        $user = Auth::user();
        
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'Bad credential.',
                'errors' => [
                    'auth' => 'bad.credential'
                ]
            ], 403);
        }        

        $user->profile()->first()->deleteProfilePicture();
        $user->delete();
        return response([], 204);
    }
}
