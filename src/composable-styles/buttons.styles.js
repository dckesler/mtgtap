import { grey, lightGrey, darkGrey, dark, lessDark, moreDark } from './color-palette.styles.js';

const button = {
	border: "none",
	padding: "6px",
	fontSize: "18px",
	display: "inline-block",
	borderRadius: "3px",
	cursor: "pointer",
}

export const standardButton = {
	...button,
	color: dark,
	background: grey,
	":hover": {
		background: lightGrey
	}
}


export const warningButton = {
	...button,
	background: "#A17878",
	color: moreDark,
	":hover": {
		background: "#A76F6F"
	}
}

export const blackButton = {
	...button,
	background: "#151515",
	color: grey,
	":hover": {
		color: lightGrey,
		background: moreDark,
	}
}
