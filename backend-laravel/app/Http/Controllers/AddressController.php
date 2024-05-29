<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Http\Requests\Address\CreateAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;
use App\Http\Resources\AddressResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return response(new AddressResource(auth()->user()->address()), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAddressRequest $request): Response
    {
        $address = new Address();
        $address->user_id = auth()->user()->id;        
        $address->state = $request->state;
        $address->city = $request->city;
        $address->neighborhood = $request->neighborhood;
        $address->street = $request->street;        
        $address->save();

        return response(new AddressResource($address), 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAddressRequest $request): Response
    {            
        if(!$address = auth()->user()->address()->first()) {
            return response([
                'message' => 'Address not found.'
            ], 404);
        }

        $address->state = $request->state;
        $address->city = $request->city;
        $address->neighborhood = $request->neighborhood;
        $address->street = $request->street;
        
        $address->save();

        return response(new AddressResource($address), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(): Response
    {
        if(!$address = auth()->user()->address()) {
            return response([
                'message' => 'Address not found.'
            ], 404);
        }

        $address->delete();
        return response()->status(204);
    }
}
