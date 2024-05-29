import Validator from "../Validator";
import { email, password } from "../commons/DefaultRules";
import { required, min, max } from "../commons/DefaultMessages";

//export default class LoginValidator extends Validator 
class LoginValidator extends Validator
{    
    public rules() {
        return {            
            email: email,
            password: password
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
            }
        }
    }
}

export default LoginValidator;