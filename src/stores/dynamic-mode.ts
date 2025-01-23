import { writable, type Writable } from 'svelte/store';

const { subscribe, set, update } = writable<boolean>(true);

export const dynamicMode: Writable<boolean> = {
    subscribe,
    set,
    update
};
