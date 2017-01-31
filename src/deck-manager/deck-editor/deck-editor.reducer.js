import * as types from './deck-editor.types.js';

const defaultState = {
	cardSearch: "",
	searchedCard: {},
	firstOrder: "converted_mana_cost",
	secondOrder: "name",
	filters: emptyFilters,
};

const emptyFilters = {
	types: [],
	subtypes: [],
	text: [],
	converted_mana_cost: [],
	color: [],
}

export default function deckEditorReducer(state = defaultState, action) {
	if (action.type === types.UPDATED_CARD_SEARCH) {
		return {...state, cardSearch: action.load};
	}
	if (action.type === types.CARD_RETRIEVED) {
		return {...state, searchedCard: action.load, status: "Card Found"};
	}
	if (action.type === types.DECK_RECEIVED) {
		return {...state, currentDeck: action.load, status: "Deck Loaded"};
	}
	if (action.type === types.DECK_EDITOR_STATUS_CHANGE) {
		return {...state, status: action.load};
	}
	if (action.type === types.DECK_UPDATED) {
		return {...state, currentDeck: action.load, status: "Saved"};
	}
	if (action.type === types.FIRST_ORDER_CHANGE) {
		return {...state, firstOrder: action.load};
	}
	if (action.type === types.SECOND_ORDER_CHANGE) {
		return {...state, secondOrder: action.load}
	}
	if (action.type === types.RESET_DECK_EDITOR) {
		return defaultState;
	}
	if (action.type === types.ADD_FILTER) {
		return {
			...state,
			filters: {
				...state.filters,
				[action.load.type]: [...state.filters[action.load.type], action.load.value]
			}
		}
	}
	if (action.type === types.REMOVE_FILTER) {
		return {
			...state,
			filters: {
				...state.filter,
				[action.load.type]: state.filters[action.load.type].filter(value => value !== action.load.value)
			}
		}
	}
	if (action.type === types.CLEAR_FILTERS) {
		return {...state, filters: emptyFilters};
	}
	return state;
}
