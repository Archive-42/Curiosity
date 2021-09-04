# React Forms Project

For this project, you will be creating a user registration form in React. Your
form should have the following fields:

1. Name
2. Email
3. Phone number
4. Staff: Instructor or Student (radio buttons)
5. Bio (text area)
6. Sign up for email notifications (checkbox)

Each form field should validate each input and return JSON upon submitting.
Since there is no backend, you can verify by printing the form data with
`console.log()`.


## Implementation

Create a new React app and add a Form component with the fields listed above.
Start with the HTML (`label`, `input`, `select`, `textarea`, `button`, etc.)
making sure you're logging the form data when you hit the submit button.

Once that's working, get your validations set up.

## Validations

* Name must be present
* Email should be properly formatted
* Phone number should be properly formatted
* Bio should have a character limit of 280 characters

The name and bio field can be validated in vanilla JS but validating email and
phone numbers are a bit more complex. There are multiple methods to implement
these: do a bit of Googling and find a method you like.

Your form should block submission and display a descriptive error message
whenever validations fail.

## Bonus

Once your form is working, here are some stretch goals:

* Add CSS styling
* Add date/time fields and validation
* Validate on keystroke instead of submit
* Highlight fields which fail validation red on failed submit


