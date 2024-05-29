<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AddressController;
use App\Http\Middleware\UnauthMiddleware;
use App\Http\Middleware\VerifyEmailMiddleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->middleware(UnauthMiddleware::class)->name('register');
    Route::post('login', [AuthController::class, 'login'])->middleware(UnauthMiddleware::class)->name('login');
    Route::post('recover-password', [AuthController::class, 'recoverPassword'])->middleware(UnauthMiddleware::class)->name('recover-password');
    Route::patch('update-password', [AuthController::class, 'updatePassword'])->middleware(UnauthMiddleware::class)->name('update-password');

    Route::middleware('auth:sanctum')->group(function() {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');        
        Route::post('verify-email', [AuthController::class, 'verifyEmail'])->name('verify-email');
        Route::post('send-email-verification-code', [AuthController::class, 'sendEmailVerificationCode'])->name('send-email-verification-code');
    });
});

Route::middleware(['auth:sanctum', VerifyEmailMiddleware::class])->group(function() {

    Route::controller(UserController::class)->prefix('user')->name('user.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('delete');
    });

    Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/create', 'store')->name('create');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('delete');
    });

    Route::controller(AddressController::class)->prefix('address')->name('address.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/create', 'store')->name('create');
        Route::patch('/update', 'update')->name('update');
        Route::delete('/delete', 'destroy')->name('delete');
    });

});