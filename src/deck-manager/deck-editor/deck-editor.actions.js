import * as types from './deck-editor.types.js';
import { getCard } from 'src/resources/gatherer.resource.js';
import { updateDeck, getDeckByName } from 'src/resources/deck.resource.js';
import { cloneDeep, partial } from 'lodash';
import { removeOne } from 'src/common/common.helpers.js';

const deckClearTime = 5000;

export function updateCardSearch(searchValue) {
	return {
		type: types.UPDATED_CARD_SEARCH,
		load: searchValue,
	}
}

export function searchForCard(card) {
	return function(dispatch) {
		dispatch({
			type: types.DECK_EDITOR_STATUS_CHANGE,
			load: "Searching for card..."
		});
		getCard(card).subscribe(
			result => dispatch({type: types.CARD_RETRIEVED, load: result}),
			error => {
				if (error.status == 400)
					dispatch({type: types.DECK_EDITOR_STATUS_CHANGE, load: "Card not found"})
			}
		);
	}
}

export function addCardToDeck(card) {
	return function(dispatch, getState) {
		const newDeckState = cloneDeep(getState().deckEditor.currentDeck);
		newDeckState.cards = newDeckState.cards.concat([card]);
		updateDeckAction(newDeckState)(dispatch, getState);
	}
}

export function removeCardFromDeck(removeCard) {
	return function(dispatch, getState) {
		const newDeckState = cloneDeep(getState().deckEditor.currentDeck);
		newDeckState.cards = removeOne(newDeckState.cards, card => card.name === removeCard.name);
		updateDeckAction(newDeckState)(dispatch, getState);
	}
}

export function updateDeckAction(deck) {
	return function(dispatch) {
		dispatch({
			type: types.DECK_EDITOR_STATUS_CHANGE,
			load: "Saving deck..."
		});
		updateDeck(deck).subscribe(
			result => {
				dispatch({
					type: types.DECK_UPDATED,
					load: deck,
				});
			},
			error => console.error(error)
		);
	}
}

export function getDeck(name) {
	return function(dispatch) {
		dispatch({
			type: types.DECK_EDITOR_STATUS_CHANGE,
			load: "Getting deck...",
		});
		getDeckByName(name).subscribe(
			result => dispatch({type: types.DECK_RECEIVED, load: result}),
			error => console.error(error),
		);
	}
}

export function changeCardOrdering(order, orderBy) {
	return {
		load: orderBy,
		type: types[order === "firstOrder" ? "FIRST_ORDER_CHANGE" : "SECOND_ORDER_CHANGE"],
	}
}

export function addFilter(type, value) {
	return {
		type: types.ADD_FILTER,
		load: {type, value},
	}
}

export function updateFilter(type, index, value) {
	return {
		type: types.UPDATE_FILTER,
		load: {type, index, value},
	}
}

export function removeFilter(type, value) {
	return {
		type: types.REMOVE_FILTER,
		load: {type, value},
	}
}

export function clearFilter() {
	return {
		type: types.CLEAR_FILTERS
	}
}

export function resetDeckEditor() {
	return {
		type: types.RESET_DECK_EDITOR
	}
}
