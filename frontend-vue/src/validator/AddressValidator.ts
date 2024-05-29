import Validator from "./Validator";
import Validation from "../helpers/Validation";
import { required } from "./commons/DefaultMessages";

class AddressValidator extends Validator 
{    
    public rules() {
        return {            
            state: [
                { method: Validation.notIsEmpty, fails: 'state.required' },
                { method: Validation.min, params: [3], fails: 'state.min' },
                { method: Validation.max, params: [255], fails: 'state.max' },
            ],
            city: [
                { method: Validation.notIsEmpty, fails: 'city.required' },    
                { method: Validation.min, params: [3], fails: 'city.min' },
                { method: Validation.max, params: [255], fails: 'city.max' },
            ],
            neighborhood: [
                { method: Validation.notIsEmpty, fails: 'neighborhood.required' },    
                { method: Validation.min, params: [3], fails: 'neighborhood.min' },
                { method: Validation.max, params: [255], fails: 'neighborhood.max' },
            ],
            street: [
                { method: Validation.notIsEmpty, fails: 'street.required' },
                { method: Validation.min, params: [3], fails: 'street.min' },
                { method: Validation.max, params: [255], fails: 'street.max' },
            ]
        };
    }

    public messages() {
        return {
            state: {
                required: required,
                string: 'Por favor, infome um estado válido.',
                min: 'O campo "estado" precisa ter no minímo 3 letras.',
                max: 'O campo "estado" não pode ter mais do que 255 letras.',
            },
            city: {
                required: required,
                string: 'Por favor, infome uma cidade válida.',
                min: 'O campo "cidade" precisa ter no minímo 3 letras.',
                max: 'O campo "cidade" não pode ter mais do que 255 letras.',
            },
            neighborhood: {
                required: required,
                string: 'Por favor, infome um bairro válido.',
                min: 'O campo "bairro" precisa ter no minímo 3 letras.',
                max: 'O campo "bairro" não pode ter mais do que 255 letras.',
            },
            street: {
                required: required,
                string: 'Por favor, infome um país válido.',
                min: 'O campo "rua" precisa ter no minímo 3 letras.',
                max: 'O campo "rua" não pode ter mais do que 255 letras.',
            },
        }
    }
}

export default AddressValidator;