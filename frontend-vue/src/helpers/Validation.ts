export default class Validation {

    public static isEmail(input: string): boolean
    {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(input);
    }

    public static isEmpty(input: any): boolean
    {
        return (
            !input ||
            (typeof input === "number" && input < 1) ||
            (input instanceof Array && input.length < 1) ||
            (input instanceof Object && Object.keys(input).length < 1)
        );
    }

    public static notIsEmpty(input: any): boolean
    {
        return !(
            !input ||
            (typeof input === "number" && input < 1) ||
            (input instanceof File && input.size <= 1) || 
            (input instanceof Array && input.length < 1) ||
            (input instanceof Object && Object.keys(input).length < 1)            
        );
    }

    public static isNumeric(input: any): boolean 
    {
        if(typeof input !== "string" && typeof input !== "number") { 
            return false;
        }
        return !isNaN(Number(input));
    }

    public static min(input: any, value: any): boolean
    {
        if(typeof input === "number" && input >= value) return true;
        if(input instanceof Object && Object.keys(input).length >= value) return true;
        if(input.length >= value) return true;
        return false;
    }

    public static max(input: any, value: any): boolean
    {
        if(typeof input === "number" && input <= value) return true;
        if(input instanceof Object && Object.keys(input).length <= value) return true;
        if(input.length <= value) return true;
        return false;
    }

    public static domain(input: string, value: Array<string>): boolean
    {
        for(const domain of value) {
            const regex = new RegExp(domain);            
            if(regex.test(input)) return true;
        }
        return false;
    }
    
    public static equal(input: any, value: any) 
    {    
        if(input instanceof Array && value instanceof Array && input.length === value.length) {
            return input.every((data, index) => {
                if(data instanceof Array && value[index] instanceof Array) return true;
                else if(data instanceof Object && value[index] instanceof Object) return true;
                return (data === value[index]);
            });
            
        }else if(input instanceof Object && value instanceof Object && Object.keys(input).length === Object.keys(value).length) {
            for(const key in input) {                
                if(!value.hasOwnProperty(key)) return false;
                else if(input[key] instanceof Array && value[key] instanceof Array) continue;
                else if(input[key] instanceof Object && value[key] instanceof Object) continue;
                else if(input[key] !== value[key]) return false;
            }            
            return true;
        }
        return (input === value);
    }

    public static digits(input: any, value: any): boolean
    {
        if(Validation.isNumeric(input)) {        
            return input.toString().length == value;
        }
        throw new Error('The value parameter must be an Numeric');
    }

    public static size(input: any, value: any): boolean
    {        
        if(input instanceof File) return input.size <= value;
        else if (input instanceof Number) return input.toString().length <= value;
        else if (input instanceof Array) return input.length <= value;
        else if (input instanceof Object) return Object.keys(input).length <= value;
        return true;
    }

    public static image(input: any): boolean
    {
        if(input instanceof File) {
            return input && input['type'].split('/')[0] === 'image';
        }
        return false        
    }
    
    public static inArray(input: any, value: any): boolean
    {
        if(value instanceof Array) {
            return value.includes(input);
        }else {
            throw new Error('The value parameter must be an array');
        }
    }
}