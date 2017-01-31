import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { standardButton } from 'styleHub';

export default function Modal(props) {
	return (
		<div>
			<div className={css(styles.modalShadow)}>
				<div className={css(styles.modal)}>
					{props.children}
					<div>
						<button
							onClick={props.promise.resolve}
							className={css(styles.confirmButton)}>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const styles = StyleSheet.create({
	modal: {
		padding: "18px",
		backgroundImage: "images/BannerWood.jpg",
	},
	modalShadow: {
		zIndex: 10000000,
		background: "rgba(200, 200, 200, .3)",
		position: "fixed",
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	confirmButton: {
		...standardButton
	}
});
