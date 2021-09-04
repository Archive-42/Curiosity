const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
  const items = [ {title: "Title 1", category: "Category 1", isComplete: true },
        { title: "Title 2", category: "Category 2" }];
    const newItem = {
        title: "Title 3",
        category: "Category 3",
      };
    const result = saveItems(items, newItem);
    expect(result).to.contain(newItem);
  });

  it('makes sure the result and the original are different', () => {
      const items = [
        { title: "Title 1", category: "Category 1", isComplete: true },
        { title: "Title 2", category: "Category 2" }
      ];
      const result = saveItems(items, {
        title: "Title 3",
        category: "Category 3",
      });
      expect(result).to.not.equal(items);
  });
});
