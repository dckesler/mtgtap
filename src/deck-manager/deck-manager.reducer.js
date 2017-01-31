import * as types from './deck-manager.types.js';

const defaultState = {};

export default function deckManagerReducer(state = defaultState, action) {
	if (action.type === types.DECKS_LOADED) {
		return {...state, decks: action.load};
	}
	if (action.type === types.MAKING_NEW_DECK) {
		return {...state, modalActive: true};
	}
	return state;
}
