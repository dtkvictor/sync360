import Validator from "./Validator";
import Validation from "../helpers/Validation";
import { required, min, max } from "./commons/DefaultMessages";
import { name } from "./commons/DefaultRules";

class ProfileValidator extends Validator
{
    public validateImageIgnoreIfNotExist(input:any)
    {
        if(!input) return true;
        return Validation.image(input);
    }

    public rules() {
        return {
            name: name,
            picture: [
                { method: this.validateImageIgnoreIfNotExist, fails: 'picture.image' },
                { method: Validation.size, params: [1024000], fails: 'picture.size' },
            ],                
            birth_date: [
                { method: Validation.notIsEmpty, fails: 'birth_date.required' },
            ],
            gender: [
                { method: Validation.notIsEmpty, fails: 'gender.required' },
                { method: Validation.inArray, params:[['male', 'famale', 'other']], fails: 'gender.in' }
            ],
            cell_number: [
                { method: Validation.notIsEmpty, fails: 'cell_number.required' },
                { method: Validation.isNumeric, fails: 'cell_number.numeric' },
                { method: Validation.digits, params: [11], fails: 'cell_number.digits' }
            ],
            about_me: [
                { method: Validation.notIsEmpty, fails: 'about_me.required' },
                { method: Validation.min, params: [3], fails: 'about_me.min' },
                { method: Validation.notIsEmpty, params: [500], fails: 'about_me.max' },
            ],
        }
    }
    
    public messages() {
        return {
            picture: {
                required: required,
                image: 'Esse campo precisa ser uma imagem',
                size: 'A imagem precisa ter no máximo 100mb'
            },                
            name: {
                required: required,
                min: min('nome', 3, 'caracteres'),
                max: max('nome', 255, 'caracteres')
            },
            birth_date: {
                required: required
            },
            gender: {
                required: required,
                in: 'Informe um gênero válido'
            },
            cell_number: {
                required: required,
                numeric: 'Informe um número de telefone válido',
                digits: 'O número de telefone precida ter 11 dígitos',
            },
            about_me: {
                required: required,
                min: min('sobre mim', 3, 'caracteres'),
                max: max('sobre mim', 255, 'caracteres')
            },
        }
    }
}

export default ProfileValidator;