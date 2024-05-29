import Validator from "../Validator";
import { email } from "../commons/DefaultRules";
import { required, max } from "../commons/DefaultMessages";

export default class RecoverPasswordValidator extends Validator
{        
    public rules() {
        return {            
            email: email,            
        };
    }

    public messages() {
        return {
            email: {
                required: required,
                email: 'Informe um email válido.',                
                max: max('email', 255, 'caracteres'),
            }            
        }
    }
}