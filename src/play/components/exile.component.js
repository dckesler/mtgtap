import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { dark, lightGrey } from 'styleHub';

export default class Exile extends React.Component {
	componentShouldMount(nextProps) {
		return this.props.cards[0].name !== nextProps.cards[0].name
	}
	render() {
		const { props } = this;
		return (
			<div className={css(styles.exile)}>
				<img
					onClick={props.changeCardView}
					className={css(styles.mainIcon)}
					src={`images/Exile.png`} />
				<img
					className={css(styles.image)}
					src={props.cards[0] ? props.cards[0].image_url : "images/Empty.png"} />
			</div>
		)
	}
}

const styles = StyleSheet.create({
	exile: {
		zIndex: "1000",
		position: "absolute",
		left: "12px",
		width: "102px",
		bottom: "12px",
	},
	mainIcon: {
		cursor: "pointer",
		position: "absolute",
		top: "-48px",
		width: "42px",
		left: "calc(50% - 21px)",
	},
	image: {
		width: "100%",
	},
});
