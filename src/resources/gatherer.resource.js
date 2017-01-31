import axios from 'axios';
import { Observable } from 'rx';

export function getCard(card) {
	return Observable
		.fromPromise(axios.get(`/card/${card}`))
		.select(response => response.data);
}
