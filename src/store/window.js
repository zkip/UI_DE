import { writable, readable } from "svelte/store"

export const pool = writable({})

// WinID
export function create(win) {
	let wID = (Math.random().toFixed(6).split("."))[1]
	pool.update((n) => (n[wID] = win, n))
	return wID
}
