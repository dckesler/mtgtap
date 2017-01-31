import React from 'react';
import Card from './card.component.js';
import { StyleSheet, css } from 'aphrodite';
import { partial } from 'lodash';

export default class CardSearcher extends React.Component {
	constructor() {
		super();
		this.state = {
			resize: () => {
				this.setState({
					width: window.innerWidth,
				})
			},
			width: window.innerWidth,
			hovered: null,
		};
	}
	componentDidMount() {
		this.setState({
			width: window.innerWidth
		});
		window.addEventListener("resize", this.state.resize);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.state.resize);
	}
	render() {
		const cardWidth = this.state.width / this.props.cards.length;
		return (
			<div className={css(styles.cardSearcher)}>
				<div className={css(styles.title)}>
					<div>Searching {this.props.view}</div>
					<div
						onClick={this.props.close}
						style={{cursor: "pointer"}}>Close Searcher</div>
				</div>
				<div className={css(styles.cards)}>
					{this.props.cards.map((card, index) => {
						return (
							<div
								key={card.name + index}
								className={css(styles.cardHolder)}
								style={{width: cardWidth > 204 ? 204 : cardWidth}}>
								<div
									style={this.state.hovered === index ? {zIndex: "1000", width: "204px"} : {}}
									className={css(styles.card)}>
									<Card
										hovered={this.state.hovered === index}
										hoverOver={cardIndex => this.setState({hovered: cardIndex})}
										toLibrary={this.props.toLibrary}
										cardReposition={this.props.cardReposition}
										moveCardToBoard={this.props.moveCardToBoard}
										cardStateMove={partial(this.props.cardStateMove, this.props.view, index)}
										index={index}
										view={this.props.view}
										card={card} />
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	cardSearcher: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 10000,
		display: "flex",
		background: "rgba(50, 50, 50, .8)",
		justifyContent: "center",
		height: "288px",
	},
	cards: {
		display: "flex",
		justifyContent: "center",
	},
	cardHolder: {
		position: "relative",
	},
	card: {
		width: "204px",
		position: "absolute",
	},
	title: {
		position: "absolute",
		top: "-48px",
	}
});
