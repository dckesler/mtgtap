import * as types from './all-decks.types.js';
import { getUserDecks, createNewDeck, getDeckByName, deleteDeck } from 'src/resources/deck.resource.js';

export function createNewDeckAction(name) {
	return function(dispatch) {
		dispatch({
			type: types.ALL_DECKS_STATUS_CHANGE,
			load: "Creating new deck..."
		});
		createNewDeck(name).subscribe(
			result => window.location.hash = `#/deck-manager/edit/${name}`,
			error => console.error(error)
		);
	}
}

export function getUserDecksAction() {
	return function(dispatch) {
		dispatch({
			type: types.ALL_DECKS_STATUS_CHANGE,
			load: "Getting decks..."
		});
		getUserDecks().subscribe(
			result => dispatch({type: types.DECKS_LOADED, load: result}),
			error => console.error(error)
		);
	}
}

export function deleteDeckAction(name) {
	return function(dispatch) {
		dispatch({
			type: types.ALL_DECKS_STATUS_CHANGE,
			load: `Deleting deck ${name}`
		});
		deleteDeck(name).subscribe(
			result => {
				dispatch({
					type: types.DECK_DELETED,
					load: name
				});
				setTimeout(() => {
					dispatch({
						type: types.ALL_DECKS_STATUS_CHANGE,
						load: ""
					})
				}, 5000);
			},
			error => console.error(error)
		);
	}
}
