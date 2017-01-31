export function removeOne(arr, predicate) {
	return arr.reduce(
		(total, curr, i) => (total.length == i && predicate(curr, i))
			? total
			: [...total, curr]
	, [])
}

