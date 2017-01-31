export function toBoardCoords(coords) {
	return {
		top: coords.top - boardLimits.top,
		left: coords.left - boardLimits.left,
	}
}

export function getBoardLimits() {
	return boardLimits;
}

const boardLimits = {
	left: 114,
	top: 72,
};
