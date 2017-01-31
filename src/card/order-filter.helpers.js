import { sortBy, map, flatten } from 'lodash';
import { pullColors } from './card.helpers.js';

export function orderUp(cards, firstOrder, secondOrder) {
	const grouped = pullLands(cards);
	return [
		...applyOrders(grouped[0], firstOrder, secondOrder),
		...sortBy(grouped[1], card => card.name)
	];
}

function pullLands(cards) {
	return [
		cards.filter(card => card.types.indexOf("Land") === -1),
		cards.filter(card => card.types.indexOf("Land") !== -1)
	]
}

export function applyOrders(cards, firstOrder, secondOrder) {
	if (!secondOrder) secondOrder = firstOrder === "name"
		? "converted_mana_cost"
		: "name";
	if (firstOrder === "color")
		return colorSort(cards, secondOrder);
	else
		return sortBy(cards, card => card[firstOrder], card => card[secondOrder]);
}

function colorSort(cards, second) {
	const colored = cards.reduce((total, curr) => {
		const manaCost = curr.mana_cost.replace(/[^WURGBC]/g, "") || "C";
		const abc = colorToAlph(manaCost);
		return total[abc]
			? {...total, [abc]: [...total[abc], curr]}
			: {...total, [abc]: [curr]}
	}, {});
	const secSorted = map(
		colored,
		(color, key) => {
			return {
				order: key,
				cards: sortBy(
					color,
					card => card[second],
					card => card[second === "name" ? "converted_mana_cost" : "name"]
				)
			}
		}
	);
	const orderedGroups = sortBy(
		secSorted,
		group => group.order.length,
		group => group.order
	)
	return orderedGroups.reduce((total, curr) => {
		return [...total, ...curr.cards];
	}, []);
}

function colorToAlph(string) {
	return string
		.replace(/W/g, "a")
		.replace(/U/g, "b")
		.replace(/B/g, "c")
		.replace(/R/g, "d")
		.replace(/G/g, "e")
		.replace(/C/g, "f")
}

export function applyFilters(cards) {
	return cards;
}
