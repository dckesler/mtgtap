import * as types from './test-game.types.js';

const defaultState = {
	decks: [],
	// library: [],
	// hand: [],
	// graveyard: [],
	// exile: [],
	// cardView: "hand",
	// board: [],
	// playingDeck: {},
	// lifeTotal: 20,
};

export default function TestGameReducer(state = defaultState, action) {
	if (action.type === types.TEST_GAME_DECKS_LOADED) {
		return {...state, decks: action.load, status: "Loaded"};
	}
	if (action.type === types.UPDATE_TEST_GAME) {
		return {...state, ...action.load};
	}
	if (action.type === types.CHANGED_CARD_VIEW) {
		return {...state, cardView: action.load};
	}
	return state;
}
