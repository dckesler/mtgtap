import React from 'react';
import CardOptions from './card-options.component.js';
import CardPlayOptions from './card-play-options.component.js';
import { StyleSheet, css } from 'aphrodite';
import { DragSource } from 'react-dnd';
import { partial } from 'lodash';

const cardSource = {
	beginDrag(props, monitor, component) {
		const rect = component.card.getBoundingClientRect();
		return {view: props.view, index: props.index, top: rect.top, left: rect.left};
	},
}
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}
@DragSource("card", cardSource, collect)
export default class Card extends React.Component {
	constructor() {
		super();
		this.state = {
			transformed: false,
			revealed: false,
		}
	}
	render() {
		const { card, view } = this.props;
		if (this.props.isDragging) return null;
		return this.props.connectDragSource(
			<div
				style={this.state.hovered && view !== "board"
					? {width: "200px", zIndex: "1000"}
					: {width: "100%"}}
				onMouseOver={() => this.props.hoverOver && this.props.hoverOver(this.props.index)}
				onMouseLeave={() => this.props.hoverOver && this.props.hoverOver(null)}
				ref={card => this.card = card}
				className={css(styles.card)}>
				{this.props.hovered &&
					<CardOptions 
						toLibrary={partial(this.props.toLibrary, this.props.view, this.props.index)}
						view={view}
						cardStateMove={this.props.cardStateMove}/>
				}
				{(view === "board" && this.props.hovered) &&
					<CardPlayOptions
						transformable={!!this.props.card.transform}
						isTransformed={this.props.isTransformed}
						isTapped={this.props.isTapped}
						index={this.props.index}
						transformCard={this.props.transformCard}
						tapCard={this.props.tapCard} />
				}
				<img
					className={css(styles.img)}
					src={`${(this.state.transformed || this.props.isTransformed)
						? card.transform.image_url
						: card.image_url}`
					}/>
			</div>
		)
	}
}
const boardLimits = {
	left: 48,
	top: 54,
}

const styles = StyleSheet.create({
	card: {
	},
	img: {
		borderRadius: "12px",
		width: "100%",
	}
});
