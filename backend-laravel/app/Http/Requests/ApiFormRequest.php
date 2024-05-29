<?php

namespace App\Http\Requests;

use App\Http\Resources\ValidationErrorsResource;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class ApiFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute.required',
            'string' => ':attribute.string',
            'min' => ':attribute.min',
            'max' => ':attribute.max',
            'email' => ':attribute.email',
            'unique' => ':attribute.unique',
            'exists' => ':attribute.exists',
            'confirmed' => ':attribute.confirmed',
            'image' => ':attribute.image',
            'size' => ':attribute.size',
            'date' => ':attribute.date',
            'in' => ':attribute.in',
            'numeric' => ':attribute.numeric',
            'digits' => ':attribute.digits',

        ];
    }

    protected function failedValidation(Validator $validator)
    {    
        (array) $validatorErrors = $validator->errors()->toArray();
        (array) $errors = array_map(fn($arrayMessage) => $arrayMessage[0], $validatorErrors);

        throw new HttpResponseException(
            response()->json(new ValidationErrorsResource($errors), 422)
        );
    }
}
