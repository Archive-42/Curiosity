# Specificity and Cascading

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [Specifishity](https://specifishity.com/)
- [Specificity Calulator](http://specificity.keegan.st/)

## Specificity

- Weighted left-to-right from heaviest to lighted with 3 values (0-0-0)
  - The left is the heaviest and refers to IDs (1-0-0)
    - `#my-div`
  - The middle is the middle weight and refers to Classes, Pseudo-Classes, and Attributes(0-1-0)
    - `.test`
    - `[type]`
  - The right is the lightest and refers to Elements (0-0-1)
    - `p`
    - `li`
    - `li div`
- Some things have no weight, like the `*` selector (0-0-0)
- `!important` overrides everything and should NOT be used (1-0-0-0-0)

## Cascading

- If two things have the same weight and target the same thing, the lowest rule wins
- Inline styles overwrite pretty much everything
- Internal stylesheets will overwrite external stylesheets
