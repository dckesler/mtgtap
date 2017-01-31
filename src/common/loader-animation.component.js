import React from 'react';
import { StyleSheet, css } from 'aphrodite';

export default function Loader(props) {
	return (
		<img
			className={css(styles.spinner)}
			style={{width: props.width || "200px"}}
			src="images/Spinner.png" />
	)
}

const styles = StyleSheet.create({
	spinner: {
		animation: "spin"
	},
	"@keyframes spin": {
		from: {
			transform: "rotate(0deg)"
		},
		to: {
			transform: "rotate(360deg)"
		}
	}
})
