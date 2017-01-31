import React from 'react';
import { DropTarget } from 'react-dnd';
import { StyleSheet, css } from 'aphrodite';
import Card from './card.component.js';
import { partial } from 'lodash';
import { toBoardCoords } from './card-placement.helper.js';

const spec = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset();
		const coords = item.view !== "board"
			? {top: item.top + delta.y, left: item.left + delta.x}
			: {top: delta.y, left: delta.x}
		component.moveCard({view: item.view, index: item.index, coords});
	}
};
function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

@DropTarget("card", spec, collect)
export default class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			hovered: null,
		}
	}
	render() {
		return this.props.connectDropTarget(
			<div className={css(styles.board)}>
				{this.props.cards.map((card, index) => {
					return (
						<div
							key={card.card.name + index}
							className={`${css(styles.card)} ${card.isTapped ? css(styles.tapped) : ""}`}
							style={card.coords}>
							<Card
								hovered={this.state.hovered === index}
								hoverOver={cardIndex => this.setState({hovered: cardIndex})}
								toLibrary={this.props.toLibrary}
								isTransformed={card.isTransformed}
								isTapped={card.isTapped}
								transformCard={this.props.transformCard}
								tapCard={this.props.tapCard}
								cardReposition={this.props.cardReposition}
								moveCardToBoard={this.props.moveCardToBoard}
								cardStateMove={partial(this.props.cardStateMove, "board", index)}
								card={card.card}
								index={index}
								view={"board"} />
						</div>
					)
				})}
			</div>
		)
	}
	moveCard(drop) {
		if (drop.view === "board") {
			this.props.cardReposition(drop.index, drop.coords);
		} else {
			this.props.moveCardToBoard(
				toBoardCoords(drop.coords),
				drop.view,
				drop.index
			);
		}
	}
}


const styles = StyleSheet.create({
	board: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		zIndex: "100",
	},
	card: {
		position: "absolute",
		width: "150px",
	},
	tapped: {
		transform: "rotate(90deg)",
	}
});
