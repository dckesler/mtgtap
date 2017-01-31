import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { modalScreen, modalShadow, modalBox } from 'styleHub';

export default class CardSearchModal extends React.Component {
	render() {
		return (
			<div className={css(styles.modalScreen)}>
				<div className={css(styles.modalShadow)}></div>
				<div className={css(styles.modalBox)}></div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	modalScreen: {
		...modalScreen,
	},
	modalShadow: {
		...modalShadow
	},
	modalBox: {
		...modalBox
	},
});
