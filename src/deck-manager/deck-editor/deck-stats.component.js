import React from 'react';
import { map, shuffle } from 'lodash';
import { pullDeckColors, toTypes, translateColor, toConvertedManaCost } from 'src/card/card.helpers.js';
import { css, StyleSheet } from 'aphrodite';
import { standardButton } from 'styleHub';

export default class DeckStats extends React.Component {
	constructor() {
		super();
		this.state = {
			expanded: false,
			drawDeck: [],
			drawDeckIndex: 0,
		}
	}
	render() {
		const { props } = this;
		return (
			<div className={css(styles.statBox)}>
				<div className={css(styles.subBox)}>
					<div className={css(styles.statHeader)}>
						# of Cards: {props.deck.cards.length}
					</div>
					{map(props.deck.cards.reduce(toTypes, {}), (num, type) => {
						const perc = Math.round((num/props.deck.cards.length) * 100);
						return num
							? <div
									className={css(styles.stat)}
									key={type}>
									{type}:
									<span className={css(styles.value)}>
										{num}
									</span>
									<span className={css(styles.percentage)}>
										{perc}%
									</span>
								</div>
							: null
					})}
				</div>
				<div className={css(styles.subBox)}>
					{map(pullDeckColors(props.deck.cards), (num, color) => {
						const perc = Math.round((num/props.deck.cards.length) * 100);
						return num
							? <div
									style={{color: translateColor(color), ...(color === "B" ? {textShadow: "1px 1px #222"} : {})}}
									className={css(styles.stat)}
									key={color}>
									{color}:
									<span className={css(styles.value)}>
										{num}
									</span>
									<span className={css(styles.percentage)}>
										{perc}%
									</span>
								</div>
							: null
					})}
				</div>
				<div className={css(styles.subBox)}>
					<div className={css(styles.statHeader)}>
						CMC
					</div>
					{map(props.deck.cards.reduce(toConvertedManaCost, {}), (num, cost) => {
						const perc = Math.round((num/props.deck.cards.length) * 100);
						return (
							<div
								className={css(styles.stat)}
								key={cost}>
								{cost}:
								<span className={css(styles.value)}>
									{num} 
								</span>
								<span className={css(styles.percentage)}>
									{perc}%
								</span>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	statBox: {
		display: "flex",
		justifyContent: "center",
		marginRight: "7%",
	},
	subBox: {
		display: "flex",
		flexDirection: "column",
		padding: "12px 18px",
		alignItems: "flex-end",
	},
	statHeader: {
		fontWeight: "bold",
		fontSize: "18px",
		background: "#CCC",
		color: "#111",
		textAlign: "center",
		width: "100%",
	},
	stat: {
		display: "flex",
		justifyContent: "flex-end",
	},
	value: {
		width: "30px",
		textAlign: "right",
	},
	percentage: {
		width: "45px",
		textAlign: "right",
	},
	button: {
		...standardButton,
	}
});
