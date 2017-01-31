import axios from 'axios';
import { Observable } from 'rx';

export function createNewDeck(name) {
	return Observable
		.fromPromise(axios.post("/new-deck", {name}))
		.select(result => result.data);
}

export function getUserDecks() {
	return Observable
		.fromPromise(axios.get("/user-decks"))
		.select(result => result.data);
}

export function getDeckByName(name) {
	return Observable
		.fromPromise(axios.get(`/user-deck/${name}`))
		.select(result => result.data);
}

export function updateDeck(deck) {
	return Observable
		.fromPromise(axios.put(`/update-deck/${deck.name}`, deck))
		.select(result => result.data);
}

export function deleteDeck(name) {
	return Observable
		.fromPromise(axios.delete(`/delete-deck/${name}`))
		.select(result => result.data);
}
