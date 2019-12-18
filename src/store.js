import stores from "{./stores}"

export function source({ ...dest }) {
	let ret = {}
	console.log(stores)
	return { ...dest }
}