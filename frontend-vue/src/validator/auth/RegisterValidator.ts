import Validator from "../Validator";
import { email, password, passwordConfirmation } from "../commons/DefaultRules";
import { required, min, max } from "../commons/DefaultMessages";

class RegisterValidator extends Validator 
{    
    public rules() {
        return {            
            email: email,
            password: password,
            password_confirmation: passwordConfirmation(this.form?.password)
        };
    }

    public messages() {
        return {
            email: {
                required: required,
                email: 'Informe um email válido.',
                max: max('email', 255, 'caracteres'),
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
export default RegisterValidator;