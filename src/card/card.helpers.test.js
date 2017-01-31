import { toConvertedManaCost, toTypes, pullColors, pullDeckColors, pullDevotion, pullDeckDevotion, cardConsolidate } from './card.helpers.js';

describe("pullColors", () => {
	it("should return an object with all contained colors", () => {
		expect(pullColors("9{B}{W}{U}")).toEqual({B: true, W: true, U: true});
	});
});

describe("pullDeckColors", () => {
	it("should return an object of deck color frequency", () => {
		const cards = [
			{mana_cost: "{B}{W}"},
			{mana_cost: "{B}{B}{R}"},
			{mana_cost: "{C}{C}{B}"},
		]
		expect(pullDeckColors(cards)).toEqual({U: 0, G: 0, B: 3, C: 1, W: 1, R: 1});
	});
});

describe("pullDevotion", () => {
	it("should return an object counting devotion", () => {
		expect(pullDevotion("{W}{W}{R}")).toEqual({W: 2, U: 0, B: 0, R: 1, G: 0, C: 0});
	});
});

describe("pullDeckDevotion", () => {
	it("should return an object for a deck's devotion", () => {
		const cards = [
			{mana_cost: "{B}{W}"},
			{mana_cost: "{B}{B}{R}"},
			{mana_cost: "{C}{C}{B}"},
		];
		expect(pullDeckDevotion(cards)).toEqual({W: 1, U: 0, B: 4, R: 1, G: 0, C: 2});
	});
});

describe("cardConsolidate", () => {
	it("should return a deck with no duplicate cards and deck amounts on cards", () => {
		const cards = [
			{name: "Fred"},
			{name: "Sam"},
			{name: "Fred"},
			{name: "Sam"},
			{name: "Susan"},
			{name: "Sally"}
		]
		expect(cardConsolidate(cards)).toEqual([
			{deckAmount: 2, card: {name: "Fred"}},
			{deckAmount: 2, card: {name: "Sam"}},
			{deckAmount: 1, card: {name: "Susan"}},
			{deckAmount: 1, card: {name: "Sally"}},
		])
	});
});

describe("to types", () => {
	it("should return an object with the types counted for", () => {
		const cards = [{types: ["a", "b", "c"]}, {types: ["a", "b"]}, {types: ["a"]}];
		expect(cards.reduce(toTypes, {})).toEqual({a: 3, b: 2, c: 1})
	})
})

describe("toConvertedManaCost", () => {
	it("should return an object with converted mana costs", () => {
		const cards = [
			{converted_mana_cost: 2, types: ["Sorcery"]},
			{converted_mana_cost: 4, types: ["Instant"]},
			{converted_mana_cost: 4, types: ["Enchantment"]},
			{converted_mana_cost: 4, types: ["Artifact"]},
			{converted_mana_cost: 7, types: ["Creature"]},
			{converted_mana_cost: 2, types: ["Creature"]},
			{converted_mana_cost: 1, types: ["Land"]},
		];
		expect(cards.reduce(toConvertedManaCost, {})).toEqual({"2": 2, "4": 3, "7": 1});
	})
})
