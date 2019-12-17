import { writable } from "svelte/store"
import { syncToCore } from "@/swwrap"

export const state = writable({
	'window/pool': {}
})

export const actions = {
	// Win : WinID
	'window/create'(win) {
		let wID = (Math.random().toFixed(6).split("."))[1]
		state['window/pool'] = win
		return wID
	}
}