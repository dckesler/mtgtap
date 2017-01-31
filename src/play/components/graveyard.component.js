import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { dark, lightGrey } from 'styleHub';

export default class Graveyard extends React.Component {
	componentShouldMount(nextProps) {
		return this.props.cards[0].name !== nextProps.cards[0].name
	}
	render() {
		const { props } = this;
		return (
			<div className={css(styles.graveyard)}>
				<img
					onClick={props.changeCardView}
					className={css(styles.mainIcon)}
					src={`images/Graveyard.png`} />
				<img
					className={css(styles.image)}
					src={props.cards[0] ? props.cards[0].image_url : "images/Empty.png"} />
			</div>
		)
	}
}

const styles = StyleSheet.create({
	graveyard: {
		zIndex: "1000",
		position: "absolute",
		left: "108px",
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
