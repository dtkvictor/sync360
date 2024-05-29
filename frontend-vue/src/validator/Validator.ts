export type RulesObject = {
    method: (input: any, ...params: (string|number|Array<any>)[]) => boolean,
    params?: Array<string|number|Array<any>>,
    fails: string,
}

export type ValidatorObject = {
    [key: string]: Array<RulesObject>
}

export interface Messages {
    [key: string]: {
        [key: string]: string;
    };
}

abstract class Validator
{    
    private fails: { [key:string]: any } = {}
    protected form: { [key:string]: any } = {}

    abstract rules(): ValidatorObject;
    abstract messages(): Messages;

    public make(form: Object|FormData): this
    {
        if(form instanceof FormData) {
            form = this.formDataToObject(form);
        }
        this.form = form;

        const rules:ValidatorObject = this.rules();
        let newForm:{ [key:string]: any } = form;

        for(const [key, value] of Object.entries(rules)) {
            if(!form.hasOwnProperty(key)) continue;
            this.applyRules(key, value, newForm[key]);
        }

        return this;
    }

    public isFailed(): boolean 
    {
        return (Object.keys(this.fails)).length >= 1; 
    }

    public getFails(): object
    {
        const fails = this.fails;
        this.fails = {};
        return fails;
    }

    public getValidationMessageFromKeyValueString(message: string): string 
    {
        if(!message) return '';
        const messages = this.messages();
        const [key, value] = message.split('.');

        if(messages[key] && messages[key][value]) {
            return messages[key][value];
        }
        return message;
    }

    private formDataToObject(formData: FormData)
    {
        const formDataObject:{ [key:string]: any } = {};

        for (const [key, value] of (formData as any)) {
            formDataObject[key]= value;
        }

        return formDataObject;
    }

    private applyRules(name:string, rules:Array<RulesObject>, inputValue:any) 
    {
        rules.forEach(rule => { 
            if(!this.checkExistFails(name)) {            
                const method = rule.method;
                const params = rule.params ?? [];
            
                if(!method(inputValue, ...params)) {
                    const messageFails = this.getValidationMessageFromKeyValueString(rule.fails);
                    this.addFails(name, messageFails);
                }
            }
        });
    } 

    private checkExistFails(name: string)
    {
        return this.fails[name];
    }

    private addFails(name: string, value: string) {
        this.fails[name] = value;
    }
}

export default Validator;