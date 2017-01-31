import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { dark, darkGrey, lightGrey } from 'styleHub';

//TODO DrawCard, Shuffle
export default class Library extends React.Component {
	componentShouldMount(nextProps) {
		return this.props.cards[0].name !== nextProps.cards[0].name;
	}
	render() {
		const { props } = this;
		return (
			<div className={css(styles.library)}>
				<div className={css(styles.options)}>
					<div 
						onClick={props.changeCardView}
						className={css(styles.option)}>
						Search
					</div>
					<div
						onClick={props.shuffleDeck}
						className={css(styles.option)}>
						Shuffle
					</div>
					<div
						onClick={props.drawCard}
						className={css(styles.option)}>
						Draw
					</div>
				</div>
				<img
					style={{borderRadius: "12px"}}
					className={css(styles.image)}
					src={'images/CardBack.jpg'} />
			</div>
		)
	}
}

const styles = StyleSheet.create({
	library: {
		zIndex: "1000",
		position: "absolute",
		left: "216px",
		width: "132px",
		bottom: "12px",
	},
	mainIcon: {
		position: "absolute",
		top: "12px",
		width: "42px",
		left: "calc(50% - 21px)",
	},
	image: {
		width: "100%",
	},
	options: {
		position: "absolute",
		width: "100%",
		top: "36px",
		left: 0,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	option: {
		cursor: "pointer",
		color: lightGrey,
		pointer: "cursor",
		textShadow: `1px 1px 1px ${darkGrey}`,
	},
	iconImg: {
	}
});
