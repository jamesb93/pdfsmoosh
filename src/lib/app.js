import { writable } from 'svelte/store';

export const files = writable(new Set([]))
export const progress = writable(0);
export const output = writable('');
export const modalOpen = writable(false);
export const processing = writable(false);
export const webOutput = writable();