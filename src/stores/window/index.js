export default {
	pool: {

	},
	// Win : WinID
	create({ state, root }, win) {
		let wID = (Math.random().toFixed(6).split("."))[1]
		state['window/pool'] = win
		return wID
	}
}