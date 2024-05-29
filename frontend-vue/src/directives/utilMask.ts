import type { DirectiveBinding } from "vue";

async function mask(el: HTMLInputElement, bindig: DirectiveBinding) {
    if(!bindig.arg) throw new Error('The mask has not been defined.');
    else if(typeof bindig.arg !== 'string') throw new Error('The argument must be a string.');
    
    try {
        if(bindig.arg) {
            const { [bindig.arg]: method }: {[key: string]: Function} = await import("util-mask");
            el.value = method(el.value) ?? null;
        }
    }catch {
        throw new Error(`The method ${bindig.arg} is not available in util-mask.`);
    }
}

export default {
    mounted(el: HTMLInputElement, bindig: DirectiveBinding) {
        mask(el, bindig);
    },
    updated(el: HTMLInputElement, bindig: DirectiveBinding) {
        mask(el, bindig);
    }
}