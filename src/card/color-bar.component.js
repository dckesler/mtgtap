import React from 'react';
import { map, reduce } from 'lodash';
import { css, StyleSheet } from 'aphrodite';
import { whiteMana, blueMana, blackMana, redMana, greenMana, colorlessMana } from 'styleHub';

export default class ColorBar extends React.Component {
	constructor(props) {
		super();
		const cardColors = props.colorFunc(props.cards);
		this.state = {
			cardColors,
			allColors: reduce(cardColors, (total, current) => total + current),

		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.cards !== nextProps.cards) {
			const cardColors = this.props.colorFunc(nextProps.cards);
			this.setState({
				cardColors,
				allColors: reduce(cardColors, (total, current) => total + current),
			});
		}
	}
	render() {
		return (
			<div className={css(styles.colorBar)}>
				{map(
					this.state.cardColors,
					(number, key) => {
						return (
							<div
								key={key}
								style={{
									width: `${(number / this.state.allColors) * 100}%`,
								}}
								className={css(styles[key])}></div>
						)
					}
				)}
			</div>
		)
	}
}

const styles = StyleSheet.create({
	colorBar: {
		height: "100%",
		width: "100%",
		display: "flex",
	},
	W: {
		background: whiteMana,
		height: "100%",
	},
	U: {
		background: blueMana,
		height: "100%",
	},
	B: {
		background: blackMana,
		height: "100%",
	},
	R: {
		background: redMana,
		height: "100%",
	},
	G: {
		background: greenMana,
		height: "100%",
	},
	C: {
		background: colorlessMana,
		height: "100%",
	}
});
