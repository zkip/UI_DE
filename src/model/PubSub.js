/**
    mode: hot | warm | cold
*/
function PubSub({ mode = "hot" } = {}) {
	let m = { /* flag: Map { sym Symbol(): handler function } */ };
	let publishCount = { /* flag: count uint */ };
	let publishData = { /* flag: []data */ };

	const publish = (flag, data) => {
		let list = m[flag];

		if (mode === "cold") {
			if (!publishCount[flag]) {
				publishCount[flag] = 0;
				publishData[flag] = [];
			}

			publishCount[flag]++;
			publishData[flag].push(data);
		} else if (mode === "warm") {
			if (!publishCount[flag]) {
				publishCount[flag] = 1;
			}
			publishData[flag] = data;
		}

		if (!list) {
			return;
		}

		list.forEach(cb => cb(data));
	}

    /**
        subscribe( string, fn )
        subscribe( string, { bool *cancelBefore, handler fn } )
    */
	const subscribe = (flag, opt_handler) => {
		let list = m[flag];
		let sym = Symbol();
		let opt = { cancelBefore: false, handler() { } };
		if (typeof opt_handler === "object") {
			opt = Object.assign(opt, opt_handler);
		} else if (typeof opt_handler === "function") {
			opt.handler = opt_handler;
		}
		let { handler, cancelBefore } = opt;

		if (!list) {
			list = new Map();
			m[flag] = list;
		}

		list.set(sym, handler);

		let cancel = () => {
			list.delete(sym);
		}

		if (cancelBefore) { return cancel; }

		let pbc = publishCount[flag];
		if (mode === "cold") {
			if (pbc) {
				for (let i = 0; i < pbc; i++) {
					handler(publishData[flag][i]);
				}
			}
		} else if (mode === "warm") {
			if (pbc) {
				handler(publishData[flag]);
			}
		}

		return cancel;
	}

	return [publish, subscribe]
}