import * as types from './test-game.types.js';
import { getUserDecks, getDeckByName } from 'src/resources/deck.resource.js';
import { shuffle, cloneDeep } from 'lodash';

export function getUserDecksAction() {
	return function(dispatch) {
		dispatch({
			type: types.TEST_GAME_CHANGE_STATUS,
			load: "Getting decks..."
		});
		getUserDecks().subscribe(
			result => dispatch({type: types.TEST_GAME_DECKS_LOADED, load: result}),
			error => console.error(error),
		);
	}
}

export function startTestGame(deckName) {
	return function(dispatch, getState) {
		getDeckByName(deckName).subscribe(
			deck => {
				const library = shuffle(deck.cards);
				const hand = library.splice(0, 7);
				dispatch({
					type: types.UPDATE_TEST_GAME,
					load: {
						library,
						hand,
						graveyard: [],
						exile: [],
						cardView: "hand",
						board: [],
						playingDeck: deck,
						lifeTotal: 20,
					}
				});
			},
			err => console.error(err)
		)
	}
}

export function shuffleDeck() {
	return function(dispatch, getState) {
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				library: shuffle(getState().testGame.library.slice()),
			}
		});
	}
}

export function drawCard() {
	return function(dispatch, getState) {
		const hand = getState().testGame.hand.slice();
		const library = getState().testGame.library.slice();
		hand.push(library.shift());
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				hand,
				library
			}
		});
	}
}

export function changeCardView(to) {
	return {
		type: types.CHANGED_CARD_VIEW,
		load: to,
	};
}

export function cardStateMove(from, index, to) {
	return function(dispatch, getState) {
		const state = getState().testGame;
		let fromHere = state[from].slice();
		let card = fromHere.splice(index, 1)[0];
		let toHere = [(card.card || card), ...state[to].slice()];
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				[from]: fromHere,
				[to]: toHere,
			}
		});
	}
}

export function toLibrary(from, index, top) {
	return function(dispatch, getState) {
		const library = getState().testGame.library.slice();
		let fromHere = getState().testGame[from].slice();
		const card = fromHere.splice(index, 1);
		const newLib = top ? [...card, ...library] : [...library, ...card];
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				library: newLib,
				[from]: fromHere,
			}
		})
	}
}

export function moveCardToBoard(coords, from, index) {
	return function(dispatch, getState) {
		const fromHere = getState().testGame[from].slice();
		const board = getState().testGame.board.slice();
		const cut = fromHere.splice(index, 1)[0];
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board: [...board, {card: cut, coords}],
				[from]: fromHere,
			}
		});
	}
}

export function leaveBoard(index, to) {
	return function(dispatch, getState) {
		const board = getState().testGame.board.slice();
		const toHere = getState().testGame[to].slice();
		const cut = board.splice(index, 1);
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board,
				[to]: [...cut, ...toHere],
			}
		})
	};
}

export function cardReposition(index, coords) {
	return function(dispatch, getState) {
		const board = getState().testGame.board.slice();
		board[index].coords = {
			top: board[index].coords.top + coords.top,
			left: board[index].coords.left + coords.left,
		}
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board,
			}
		});	
	}
}

export function tapCard(bool, index) {
	return function(dispatch, getState) {
		const board = getState().testGame.board.slice();
		board[index].isTapped = bool;
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board,
			}
		})
	}
}

export function untapAll() {
	return function(dispatch, getState) {
		const board = getState().testGame.board.slice().map(card => ({...card, isTapped: false}));
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board,
			}
		})
	}
}

export function transformCard(bool, index) {
	return function(dispatch, getState) {
		const board = getState().testGame.board.slice();
		board[index].isTransformed = bool;
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				board,
			}
		})
	}
}

export function lifeChange(change) {
	return function(dispatch, getState) {
		dispatch({
			type: types.UPDATE_TEST_GAME,
			load: {
				lifeTotal: getState().testGame.lifeTotal + change,
			}
		});
	}
}

export function toggleCardSearcher(bool, view) {
	return {
		type: types.UPDATE_TEST_GAME,
		load: {
			cardSearcher: bool,
			cardView: view,
		}
	}
}

