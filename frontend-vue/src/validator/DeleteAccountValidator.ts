import Validator from './Validator';
import { password } from "./commons/DefaultRules";
import { required, min, max } from "./commons/DefaultMessages";

class DeleteAccountValidator extends Validator 
{    
    public rules() {
        return {
            password: password,
        };
    }

    public messages() {
        return {            
            password: {
                required: required,
                min: min('senha', 8, 'caracteres'),
                max: max('senha', 255, 'caracteres'),
            }
        }
    }
}
export default DeleteAccountValidator;