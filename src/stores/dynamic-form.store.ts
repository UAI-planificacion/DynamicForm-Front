import { writable } from 'svelte/store';
import type { DynamicForm } from '$models';

function createDynamicFormStore() {
    const { subscribe, set, update } = writable<DynamicForm[]>([]);

    return {
        subscribe,
        init: (forms: DynamicForm[]) => set(forms),
        add: (form: DynamicForm) => update(forms => [...forms, form]),
        update: (id: string, updatedForm: DynamicForm) => 
            update(forms => forms.map(form => 
                form._id === id ? updatedForm : form
            )),
        remove: (id: string) => 
            update(forms => forms.filter(form => form._id !== id))
    };
}

export const dynamicForms = createDynamicFormStore();
