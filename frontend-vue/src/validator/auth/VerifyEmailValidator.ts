import Validator from "../Validator";
import Validation from "@/helpers/Validation";

export default class VerifyEmailValidator extends Validator
{        
    public rules() {
        return {
            code: [
                { method: Validation.notIsEmpty, fails: 'code.required' },
            ]
        };
    }

    public messages() {
        return {
            code: {
                required: 'Por favor, informe o código de segurança.',
                invalid: 'Informe um código válido.'

            }
        }
    }
}