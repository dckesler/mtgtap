import React from 'react';
import Deck from './deck.component.js';
import { StyleSheet, css } from 'aphrodite';
import { input, invisibleInput } from 'styleHub';
import { Observable } from 'rx';
import { partial } from 'lodash';

export default class AllDecks extends React.Component {
	constructor() {
		super();
		this.state = {
			newDeckName: ""
		}
	}
	componentDidMount() {
		Observable.fromEvent(this.newDeckInput, "keydown")
		.filter(e => e.keyCode == 13)
		.pluck("target", "value")
		.subscribe(this.props.actions.createNewDeckAction);
	}
	render() {
		return (
			<div>
				<div className={css(styles.top)}>
					<div className={css(styles.header)}>
						{this.props.allDecks.status}
					</div>
					<div className={css(styles.newDeckBox)}>
						<div>
							Make a new deck
						</div>
						<div className={css(styles.inputBox)}>
							<input
								onChange={e => this.setState({newDeckName: e.target.value})}
								ref={ref => this.newDeckInput = ref}
								placeholder={"New Deck Name"}
								value={this.state.newDeckName}
								className={css(styles.input)} />
							<i
								onClick={() => {
									if (this.newDeckInput.value)
										this.props.actions.createNewDeckAction(this.newDeckInput.value);
								}}
								className={`fa fa-plus ${css(styles.newDeckIcon)}`}></i>
						</div>
					</div>
				</div>
				<div className={css(styles.deckBox)}>
					{this.props.allDecks.decks.map(deck => {
						return (
							<div
								className={css(styles.deck)}
								key={deck.name}>
								<Deck
									deck={deck}
									delete={this.props.actions.deleteDeckAction}/>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const styles = StyleSheet.create({
	top: {
		marginBottom: "12px",
	},
	newDeckBox: {
		display: "inline-block",
	},
	inputBox: {
		...input,
		display: "flex",
		position: "relative",
	},
	input: {
		...invisibleInput,
	},
	header: {
		color: "#CCC",
		fontSize: "24px",
		marginBottom: "6px",
	},
	deckBox: {
		display: "flex",
	},
	deck: {
		margin: "6px",
	},
	newDeckIcon: {
		background: "#CCC",
		color: "#333",
		height: "35px",
		width: "35px",
		position: "absolute",
		right: 0,
		top: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: "30px",
		cursor: "pointer",
		":hover": {
			background: "#DDD",
		}
	}
});
