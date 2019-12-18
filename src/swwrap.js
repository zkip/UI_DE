import { writable, derived } from "svelte/store"
import { actions, state } from "@/stores"

const dependencies = {}

export const be = {
	async setup({ source }) {

	},
	async lose({ source }) {

	},
	async subscribe({ source, data }) {
		let { id } = source
		let { path } = data
		let m = dependencies[path]
		if (m) {
			m.push(id)
		}
	},
	async unsubscribe(source) {
		let { id, data } = source
		let { path } = data
		let m = dependencies[path]
		if (m) {
			dependencies[path] = m.filter(pid => pid !== id)
		}
	},
}


export async function update(path, val) {
	if (typeof state[path] !== 'undefined') {
		state[path] = writable(val)
	} else {
		state[path].update(() => val)
	}
}

export async function push(path) {
	return state[path]
}

// resolve the dependencies for tab and path
export function hit(path) {
	return dependencies[path]
}

export async function pushToSide(path, ...args) {
	let targets = hit(path)
	targets.forEach(t => t.postMessage({ type: "push_from_core", path, args }))
}

export async function syncToCore(path, ...args) {
	let { active } = await navigator.serviceWorker.ready;
	active.postMessage({ type: "sync_from_side", path, args });
}

export function core() {
	return {
		get(path) {
			return state[path]
		},
		call(path, ...args) {
			actions[path].call(null, ...args)
			pushToSide(path, ...args)
		}
	};
}

export function side(path) {
	navigator.serviceWorker.ready.then(({ active }) => {
		active.postMessage({ type: "subscribe", path });
	})
	return {
		get() {
			return state[path]
		},
		call(...args) {
			navigator.serviceWorker.ready.then(({ active }) => {
				active.postMessage({ type: "subscribe", path, args });
			})
			return () => {
				actions[path].call(null, ...args)
				syncToCore(path, ...args)
			}
		}
	};
}

// Readable
export function Source(path) {
	// return derived(state[path])
}
