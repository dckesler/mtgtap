import { reduce, findIndex, sortBy, map } from 'lodash';
import { whiteMana, blueMana, blackMana, redMana, greenMana, colorlessMana } from '../composable-styles/style.hub.js';

const emptyColors = {W: 0, U: 0, B: 0, R: 0, G: 0, C: 0};

export function pullColors(manaCost) {
	if (!manaCost) return {};
	let mana = manaCost.replace(/[^WURGBC]/g, "");
	if (mana === "") return {C: true};
	return reduce(mana, (total, current) => {
		return {...total, [current]: true}
	}, {});
}

export function pullDeckColors(cards) {
	return cards.reduce((total, card) => {
		let cardMana = pullColors(card.mana_cost);
		return reduce(cardMana, (totalMana, value, key) => {
			if (value) totalMana[key]++;
			return totalMana;
		}, total);
	}, {W: 0, U: 0, B: 0, R: 0, G: 0, C: 0});
}

export function pullDevotion(manaCost) {
	if (!manaCost) return {W: 0, U: 0, B: 0, R: 0, G: 0, C: 0};
	let mana = manaCost.replace(/[^WURGBC]/g, "");
	return reduce(mana, (total, current) => {
		return {...total, [current]: total[current] + 1};
	}, {W: 0, U: 0, B: 0, R: 0, G: 0, C: 0});
}

export function pullDeckDevotion(cards) {
	return cards.reduce((total, card) => {
		let cardDevotion = pullDevotion(card.mana_cost);
		return reduce(cardDevotion, (totalDevotion, value, key) => {
			totalDevotion[key] += value;
			return totalDevotion;
		}, total);
	}, {W: 0, U: 0, B: 0, R: 0, G: 0, C: 0});
}

export function cardConsolidate(cards) {
	return cards.reduce((total, card) => {
		let index = findIndex(total, item => item.card.name === card.name);
		total[index !== -1 ? index : total.length] = index !== -1
			? {...total[index], deckAmount: total[index].deckAmount + 1}
			: {deckAmount: 1, card: {...card}}
		return total;
	}, []);
}

export function toTypes(total, card) {
	return addToTotal(total, card.types);
}

function addToTotal(total, types, index = 0) {
	const type = types[index];
	return types.length !== index
		? addToTotal(
				{...total, [type]: total[type] ? total[type] + 1 : 1},
				types,
				index + 1
			)
		: total;
}


export function translateColor(color) {
	if (color === "W") return whiteMana;
	if (color === "U") return blueMana;
	if (color === "B") return blackMana;
	if (color === "R") return redMana;
	if (color === "G") return greenMana;
	if (color === "C") return colorlessMana;
}

export function toConvertedManaCost(manaCosts, card) {
	if (card.types.indexOf("Land") !== -1) return manaCosts;
	const manaCost = card.converted_mana_cost;
	return manaCosts[manaCost]
		? {...manaCosts, [manaCost]: manaCosts[manaCost] + 1}
		: {...manaCosts, [manaCost]: 1}
}

