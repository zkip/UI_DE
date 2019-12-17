
addEventListener("load", async e => {
	try {
		let { active } = await navigator.serviceWorker.ready;
		active.postMessage({ type: "setup" });
		navigator.serviceWorker.addEventListener("message", e => {
			console.log(e)
		});
	} catch (err) {
		console.error(err)
	}
})
addEventListener("beforeunload", async e => {
	let { active } = await navigator.serviceWorker.ready;
	active.postMessage({ type: "lose" });
	console.log(e)
})
