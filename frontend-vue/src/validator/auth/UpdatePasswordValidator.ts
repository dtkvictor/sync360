import Validator from "../Validator";
import { password, passwordConfirmation } from "../commons/DefaultRules";
import { required, min, max } from "../commons/DefaultMessages";
import Validation from "@/helpers/Validation";

export default class UpdatePasswordValidator extends Validator
{        
    public rules() {
        return {
            code: [
                { method: Validation.notIsEmpty, fails: 'code.required' },
            ],            
            password: password,
            password_confirmation: passwordConfirmation(this.form?.password)
        };
    }

    public messages() {
        return {
            code: {
                required: 'Por favor, informe o código de segurança.',
                invalid: 'Informe um código válido.'

            },
            password: {
                required: required,
                min: min('senha', 8, 'caracteres'),
                max: max('senha', 255, 'caracteres'),
            },
            password_confirmation: {
                required: required,
                min: min('senha', 8, 'caracteres'),
                max: max('senha', 255, 'caracteres'),
                confirmed: 'As senhas digitadas não coincidem.'
            }
        }
    }
}