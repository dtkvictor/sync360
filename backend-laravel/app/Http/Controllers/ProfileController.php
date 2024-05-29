<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfileResource;
use App\Http\Requests\Profile\CreateProfileRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $profile = auth()->user()->profile;
        $profile->getPictureUrl();

        return response(new ProfileResource($profile), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProfileRequest $request): Response
    {
        $profile = new Profile();
        $profile->user_id = auth()->user()->id;
        $profile->name = $request->name;
        $profile->birth_date = $request->birth_date;
        $profile->gender = $request->gender;
        $profile->cell_number = $request->cell_number;
        $profile->about_me = $request->about_me;
        $profile->uploadProfilePicture($request->file('picture'));
        $profile->save();

        $profile->getPictureUrl();

        return response(new ProfileResource($profile), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request): Response
    {
        if(!$profile = auth()->user()->profile()->first()) {
            return response([
                'message' => 'Profile not found.'
            ], 404);
        }

        $profile->name = $request->name;
        $profile->birth_date = $request->birth_date;
        $profile->gender = $request->gender;
        $profile->cell_number = $request->cell_number;
        $profile->about_me = $request->about_me;

        if($request->hasFile('picture')) {
            $profile->deleteProfilePicture();
            $profile->uploadProfilePicture($request->file('picture'));
        }
        
        $profile->save();
        $profile->getPictureUrl();

        return response(new ProfileResource($profile), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile): Response
    {
        if(!$profile = auth()->user()->profile()) {
            return response([
                'message' => 'Profile not found.'
            ], 404);
        }

        $profile->deleteProfilePicture();
        $profile->delete();
        return response()->status(204);
    }
}
