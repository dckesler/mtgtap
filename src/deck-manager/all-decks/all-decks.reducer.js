import * as types from './all-decks.types.js';

const defaultState = {decks: [], status: "Current"};
export default function allDeckReducer(state = defaultState, action) {
	if (action.type === types.ALL_DECKS_STATUS_CHANGE) {
		return {...state, status: action.load};
	}
	if (action.type === types.DECKS_LOADED) {
		return {...state, decks: action.load, status: "Decks Loaded"};
	}
	if (action.type === types.DECK_DELETED) {
		return {
			...state,
			status: `Successfully deleted deck ${action.load}`,
			decks: state.deck.filter(deck => deck.name !== action.load)
		};
	}
	return state;
}
