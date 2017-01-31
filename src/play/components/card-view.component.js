import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Card from './card.component.js';
import { partial } from 'lodash';

export default class CardView extends React.Component {
	constructor() {
		super();
		this.state = {
			hovered: null
		}
	}
	render() {
		return (
			<div className={css(styles.cardView)}>
				{this.props.cards.map((card, index) => {
					return (
						<div
							className={css(styles.card)}
							key={card.name + index}>
							<Card
								hoverOver={num => this.setState({hovered: num})}
								hovered={index === this.state.hovered}
								toLibrary={this.props.toLibrary}
								cardReposition={this.props.cardReposition}
								moveCardToBoard={this.props.moveCardToBoard}
								cardStateMove={partial(this.props.cardStateMove, this.props.view, index)}
								index={index}
								view={this.props.view}
								card={card} />
						</div>
					)
				})}
			</div>
		)
	}
}

const styles = StyleSheet.create({
	cardView: {
		position: "absolute",
		bottom: 0,
		left: "360px",
		width: "calc(100% - 360px)",
		display: "flex",
		zIndex: "1000",
	},
	card: {
		width: "144px",
		height: "204px",
		position: "relative",
	}
});
