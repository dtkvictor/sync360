export const required = 'Este campo é obrigatório.';
export const email = 'Insira um endereço de email válido.';
export const date = 'Selecione uma data válida.';
export const string = (value: string) => `Por favor, infome um ${value} válido.`;
export const min = (campo: string, value: number, type:string) => `O campo "${campo}" precisa ter no minímo ${value} ${type}.`;
export const max = (campo: string, value: number, type:string) => `O campo "${campo}" não pode ter mais do que ${value} ${type}.`;