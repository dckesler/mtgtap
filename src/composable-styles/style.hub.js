import { StyleSheet, css } from 'aphrodite';
import * as inputs from './inputs.styles.js';
import * as boxes from './box.styles.js';
import * as colors from './color-palette.styles.js';
import * as buttons from './buttons.styles.js';
import * as modals from './modal.styles.js';

function styleIt(style) {
	return css(StyleSheet.create(style));
}

export default {
	styleIt,
	...inputs,
	...boxes,
	...colors,
	...buttons,
	...modals,
}
