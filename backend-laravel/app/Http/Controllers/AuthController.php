<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\RecoverPasswordRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Requests\Auth\VerifyEmailRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use App\Mail\RecoverPasswordMail;
use App\Mail\VerifyEmailMail;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(LoginRequest $request): Response
    {       
        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'Bad credential.',
                'errors' => [
                    'auth' => 'bad.credential'
                ]
            ], 401);
        }        
        $user->loadAll();
        return response(new AuthResource($user), 200);
    }

    public function register(RegisterRequest $request): Response
    {
        $user =  new User();
        $user->email = $request->email;
        $user->password = $request->password;
        $user->save();
        $user->loadAll();
        return response(new AuthResource($user), 201);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();
        return response()->status(204);
    }

    public function recoverPassword(RecoverPasswordRequest $request): Response
    {        
        if($user = User::where('email', $request->email)->first()) {                        
            Mail::to($request->email)->send(                
                new RecoverPasswordMail($user->createSecurityCode('recover_password'))
            );
            return response([], 204);
        }
        sleep(rand(1, 3));
        return response([], 204);
    }

    public function updatePassword(UpdatePasswordRequest $request): Response 
    {        
        if($user = (new User())->getUserByRecoverCode($request->code)->first()) {

            $user->password = $request->password;
            $user->save();

            return response([
                'message' => 'Password Updated successfully',                
            ], 201);

        }
        return response([], 404);
    }

    public function verifyEmail(VerifyEmailRequest $request): Response
    {
        $user = auth()->user();
        $user->verifyEmail();

        return response([
            'message' => 'Email verified successfully',            
        ], 201);
    }

    public function sendEmailVerificationCode(): Response
    {
        $user = auth()->user();

        if(!empty($user)) {
            Mail::to($user->email)->send(
                new VerifyEmailMail($user->createSecurityCode('verify_email'))
            );
        } 
        return response([], 204);
    }
}
