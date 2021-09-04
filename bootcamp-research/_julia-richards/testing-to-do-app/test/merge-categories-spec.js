const { expect } = require("chai");
const { mergeCategories } = require("../merge-categories");

describe("mergeCategories()", () => {
	context("Using <li> tags", () => {
		const template = `
				<div>
					<ul>
						{{#each categories}}
							<li>{{ this }}</li>
						{{/each}}
					</ul>
				</div>
			`;
		it("should return no <li>s for no categories", () => {
			//Arrange
			const categories = [];
			//Act
			const result = mergeCategories(template, categories, "li");
			//Assert
			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<ul>");
			expect(result).to.contain("</ul>");
			expect(result).to.not.contain("<li>");
			expect(result).to.not.contain("</li>");
		});

		it("should return a single <li> for one category", () => {
			//Arrange
			const categories1 = ["str"];
			//Act
			const result = mergeCategories(template, categories1, "li");
			//Assert
			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<ul>");
			expect(result).to.contain("</ul>");
			expect(result).to.contain("<li>str</li>");
			expect(result).to.not.contain("<!-- Content here -->");
		});

		it("should return an <li> for each category", () => {
			//Arrange
			const categories = ["first str", "second str", "third str"];
			//Act
			const result = mergeCategories(template, categories, "li");
			//Assert
			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<ul>");
			expect(result).to.contain("</ul>");
			expect(result).to.contain("<li>first str</li>");
			expect(result).to.contain("<li>second str</li>");
			expect(result).to.contain("<li>third str</li>");
			expect(result).to.not.contain("<!-- Content here -->");
		});
	});

	context("using <option> tags", () => {
		const template = `
			<div>
				<select>
					{{#each categories}}
						<option>{{ this }}</option>
					{{/each}}
				</select>
			</div>
		`;
		it("should return no <option>s for no categories", () => {
			//arrage
			const categories = [];
			//act
			const result = mergeCategories(template, categories, "option");
			//assert
			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<select>");
			expect(result).to.contain("</select>");
			expect(result).to.not.contain("<option>");
			expect(result).to.not.contain("</option>");
			expect(result).to.not.contain("<!-- Content here -->");
		});

		it("should return a single <option> for one category", () => {
			const categories = ["string"];

			const result = mergeCategories(template, categories, "option");

			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<select>");
			expect(result).to.contain("</select>");
			expect(result).to.contain("<option>string</option>");
			expect(result).to.not.contain("<!-- Content here -->");
		});

		it("should return an <option> for each category", () => {
			const categories = ["string", "puppies"];

			const result = mergeCategories(template, categories, "option");

			expect(result).to.contain("<div>");
			expect(result).to.contain("</div>");
			expect(result).to.contain("<select>");
			expect(result).to.contain("</select>");
			expect(result).to.contain("<option>string</option>");
			expect(result).to.contain("<option>puppies</option>");
			expect(result).to.not.contain("<!-- Content here -->");
		});
	});
});
