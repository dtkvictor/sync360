import type { RulesObject } from "../Validator";
import Validation from "@/helpers/Validation";

export const name:Array<RulesObject> = [                
    { method: Validation.notIsEmpty, fails: 'name.required' },
    { method: Validation.min, params: [3], fails: 'name.min' },
    { method: Validation.max, params: [255], fails: 'name.max' }
];

export const email:Array<RulesObject> = [
    { method: Validation.notIsEmpty, fails: 'email.required' },
    { method: Validation.isEmail, fails: 'email.email' },
    { method: Validation.max, params: [255], fails: 'email.max' }
];

export const password:Array<RulesObject> = [
    { method: Validation.notIsEmpty, fails: 'password.required' },
    { method: Validation.min, params: [8], fails: 'password.min' },
    { method: Validation.max, params: [255], fails: 'password.max' },
];

export function passwordConfirmation(passwordCompare: string): Array<RulesObject> {
    return [
        { method: Validation.notIsEmpty, fails: 'password_confirmation.required' },
        { method: Validation.equal, params: [passwordCompare], fails: 'password_confirmation.confirmed' },
    ];
};