import { reactive } from "vue";
import axios from "./axios";
import { AxiosError, AxiosResponse } from "axios";
import Validator from "@/validator/Validator";

type FormRequestSubmit = {
    method: string, 
    url: string, 
    headers?: Record<any,any>,
    onSuccess?: (response: AxiosResponse) => void, 
    onError?: (error: AxiosError) => void,
    onFinally?: () => void,
    onRequest?: () => void
}

export default class FormRequest {

    data: Record<string, any> = reactive({});
    errors: Record<string, string> = reactive({});
    validator: Validator;

    constructor(validator: Validator, data: Record<string, any>) {
        this.validator = validator;

        for(let key in data) {
            this.data[key] = data[key];
            this.errors[key] = '';
        }
    }

    getData(): Record<string, any> {        
        return { ...this.data };
    }

    setData(key: string, value: any): void {
        this.data[key] = value;
    }

    getErrors(): Record<string, string> {
        return this.errors;
    }

    setError(key: string, value: string): void {
        this.errors[key] = value;
    }

    setErrors(errors: Record<string, string>): void {
        for(let key in errors) {
            let message = this.validator.getValidationMessageFromKeyValueString(errors[key]);
            this.setError(key, message);
        }
    }

    resetData(): void {
        for(let key in this.data) {
            this.data[key] = '';
        }
    }

    resetErrors(): void {
        for(let key in this.errors) {
            this.errors[key] = '';
        }
    }

    submit({ method, url, headers, onSuccess, onError, onFinally, onRequest}: FormRequestSubmit): void
    {
        this.validator.make(this.getData());

        if(this.validator.isFailed()) {            
            this.resetErrors();
            this.setErrors(this.validator.getFails() as {[key:string]: string});
            if(onFinally) onFinally();
            return;
        }
        
        let options:Record<any, any> = {
            method: method,
            url: url,
            data: this.getData()
        }
        if(headers) {
            options.headers = headers;
        }
        if(onRequest) onRequest();

        axios(options).then(response => {
            if(onSuccess) onSuccess(response);
        })
        .catch(error => {
            console.log(error);
            this.resetErrors();
            if(error.response && error.response.data) {
                this.setErrors(error.response.data.errors);
            }        
            if(onError) onError(error);                
        })
        .finally(() => { 
            if(onFinally) onFinally();
        })
    }
        
}
