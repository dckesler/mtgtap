import { removeOne } from './common.helpers.js';

describe("removeOne", () => {
	it("should remove a single item from an array based on a predicate", () => {
		expect(removeOne(["a", "a", "b", "b", "c"], letter => letter === "b")).toEqual(["a", "a", "b", "c"]);
	});
})
