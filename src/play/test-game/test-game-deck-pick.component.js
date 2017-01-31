import React from 'react';
import * as actions from './test-game.actions.js';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import Deck from 'src/card/deck.component.js';
import { blackButton, standardButton, grey, darkGrey, lightGrey, lessDark, dark } from 'styleHub';
import { startTestGame } from './test-game.actions.js';

@connect(state => ({
	decks: state.testGame.decks,
}))
export default class TestGamePick extends React.Component {
	constructor() {
		super();
		this.state = {
			chosenDeck: null
		};
	}
	componentWillMount() {
		this.props.dispatch(actions.getUserDecksAction())
	}
	render() {
		return (
			<div className={css(styles.testGamePick)}>
				<div className={css(styles.decksBox)}>
					{this.props.decks.map(deck => {
						if (!deck.cards.length) return null;
						return (
							<div
								key={deck.name}
								className={`${css(styles.deckBox)} ${deck.name === this.state.chosenDeck ? css(styles.chosenDeck) : ""}`}
								onClick={() => this.setState({chosenDeck: deck.name})}>
								<Deck deck={deck} />
							</div>
						)
					})}
				</div>
				<div className={css(styles.buttonBox)}>
					<button
						onClick={() => {
							window.location.hash = `#/play/test-game/with/${this.state.chosenDeck}`;
						}}
						className={css(this.state.chosenDeck ? styles.confirm : styles.disabled)}>
						{this.state.chosenDeck ? "Play" : "Pick A Deck"}
					</button>
				</div>
				
			</div>
		)
	}
}

const styles = StyleSheet.create({
	testGamePick: {
		paddingLeft: "126px",
	},
	decksBox: {
		display: "flex",
		flexWrap: "wrap",
	},
	deckBox: {
		margin: "0 12px 12px 12px",
		cursor: "pointer",
		padding: "6px",
		border: `1px solid ${grey}`,
	},
	chosenDeck: {
		background: dark,
		boxShadow: `2px 2px 8px ${darkGrey}`
	},
	buttonBox: {
	},
	confirm: {
		...standardButton
	},
	disabled: {
		...blackButton,
		cursor: "not-allowed",
		":hover": {}
	}

});
