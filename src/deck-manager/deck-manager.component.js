import React from 'react';
import styles from './deck-manager.styles.js';
import { css } from 'aphrodite';
import { partial } from 'lodash';

export default class DeckManager extends React.Component {
	constructor() {
		super();
		this.state = {
			newDeckName: "",
		}
	}
	render() {
		const currentDeck = this.props.deckEditor.currentDeck;
		return (
			<div className={css(styles.deckManager)}>
				{this.props.deckManager.modalActive
					? Modal(
							this.state.newDeckName,
							(e) => this.setState({newDeckName: e.target.value}),
							partial(this.props.actions.newDeckRequest, this.state.newDeckName)
						)
					: null}
				<div className={css(styles.deckManagerBar)}>
					<a
						className={currentDeck
							? css(styles.sideBarLink)
							: css(styles.disabledLink)
						}
						onClick={() => {
							if (currentDeck)
								window.location.hash = `#/deck-manager/edit/${currentDeck.name}`
						}}>
						{this.props.deckEditor.currentDeck
							? `Editing Deck ${this.props.deckEditor.currentDeck.name}`
							: `No Deck Currently Being Edited`}
					</a>
					<a
						href={`#/deck-manager/all-decks`}
						className={css(styles.sideBarLink)}>All Decks</a>
				</div>
				{this.props.children}
			</div>
		)
	}
}

function Modal(value, handleChange, action) {
	return (
		<div className={css(styles.modalShadow)}>
			<div className={css(styles.modalBox)}>
				<input
					value={value}
					className={css(styles.modalInput)}
					onChange={handleChange}/>
				<button
					className={css(styles.modalButton)}
					onClick={action}>
					Create Deck
				</button>
			</div>
		</div>
	)
}
