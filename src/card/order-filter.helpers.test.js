import { applyOrders } from './order-filter.helpers.js';

describe("applyOrders", () => {
	let cards = [
			{converted_mana_cost: 5, mana_cost: "W", name: "Frank"},
			{converted_mana_cost: 4, mana_cost: "G", name: "Bear"},
			{converted_mana_cost: 4, mana_cost: "G", name: "Fat"},
			{converted_mana_cost: 3, mana_cost: "R", name: "Cat"},
			{converted_mana_cost: 2, mana_cost: "U", name: "Dandy"},
			{converted_mana_cost: 2, mana_cost: "U", name: "Zebra"},
			{converted_mana_cost: 1, mana_cost: "C", name: "Ear"},
			{converted_mana_cost: 1, mana_cost: "B", name: "Gramps"},
	];
	let colorCards = [
		{mana_cost: "WWB", name: "z", converted_mana_cost: 1},
		{mana_cost: "W", name: "b", converted_mana_cost: 8},
		{mana_cost: "B", name: "c", converted_mana_cost: 7},
		{mana_cost: "C", name: "d", converted_mana_cost: 6},
		{mana_cost: "WWWWB", name: "e", converted_mana_cost: 5},
		{mana_cost: "WWB", name: "a", converted_mana_cost: 9},
		{mana_cost: "BB", name: "f", converted_mana_cost: 4},
		{mana_cost: "WUBRGC", name: "g", converted_mana_cost: 3},
	];
	it("should order by cmc", () => {
		expect(applyOrders(cards, "converted_mana_cost"))
			.toEqual(cmcCards);
	});
	it("should order by name", () => {
		expect(applyOrders(cards, "name"))
			.toEqual(nameCards);
	});
	describe("color", () => {
		it("should order by color and name", () => {
			console.log(applyOrders(colorCards, "color", "name"));
			expect(applyOrders(colorCards, "color", "name"))
				.toEqual(sortedColorsName)
		});
		it("should order by color and cmc", () => {
			expect(applyOrders(colorCards, "color", "converted_mana_cost"))
				.toEqual(sortedColorsCmc);
		});
	})


})

const cmcCards = [
	{converted_mana_cost: 1, mana_cost: "C", name: "Ear"},
	{converted_mana_cost: 1, mana_cost: "B", name: "Gramps"},
	{converted_mana_cost: 2, mana_cost: "U", name: "Dandy"},
	{converted_mana_cost: 2, mana_cost: "U", name: "Zebra"},
	{converted_mana_cost: 3, mana_cost: "R", name: "Cat"},
	{converted_mana_cost: 4, mana_cost: "G", name: "Bear"},
	{converted_mana_cost: 4, mana_cost: "G", name: "Fat"},
	{converted_mana_cost: 5, mana_cost: "W", name: "Frank"},
]

const nameCards = [
	{converted_mana_cost: 4, mana_cost: "G", name: "Bear"},
	{converted_mana_cost: 3, mana_cost: "R", name: "Cat"},
	{converted_mana_cost: 2, mana_cost: "U", name: "Dandy"},
	{converted_mana_cost: 1, mana_cost: "C", name: "Ear"},
	{converted_mana_cost: 4, mana_cost: "G", name: "Fat"},
	{converted_mana_cost: 5, mana_cost: "W", name: "Frank"},
	{converted_mana_cost: 1, mana_cost: "B", name: "Gramps"},
	{converted_mana_cost: 2, mana_cost: "U", name: "Zebra"},
]
const sortedColorsName = [
		{mana_cost: "W", name: "b", converted_mana_cost: 8},
		{mana_cost: "B", name: "c", converted_mana_cost: 7},
		{mana_cost: "C", name: "d", converted_mana_cost: 6},
		{mana_cost: "BB", name: "f", converted_mana_cost: 4},
		{mana_cost: "WWB", name: "a", converted_mana_cost: 9},
		{mana_cost: "WWB", name: "z", converted_mana_cost: 1},
		{mana_cost: "WWWWB", name: "e", converted_mana_cost: 5},
		{mana_cost: "WUBRGC", name: "g", converted_mana_cost: 3},
 ]

const sortedColorsCmc = [
		{mana_cost: "W", name: "b", converted_mana_cost: 8},
		{mana_cost: "B", name: "c", converted_mana_cost: 7},
		{mana_cost: "C", name: "d", converted_mana_cost: 6},
		{mana_cost: "BB", name: "f", converted_mana_cost: 4},
		{mana_cost: "WWB", name: "z", converted_mana_cost: 1},
		{mana_cost: "WWB", name: "a", converted_mana_cost: 9},
		{mana_cost: "WWWWB", name: "e", converted_mana_cost: 5},
		{mana_cost: "WUBRGC", name: "g", converted_mana_cost: 3},
 ]
