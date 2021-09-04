const Validator = require('validator')
const validText = require('./valid-text')

module.exports = function validateEventInput(data) {
	let errors = {}

	data.title = validText(data.title) ? data.title : ''
	if (Validator.isEmpty(data.title)) {
		errors.title = 'Title field is required'
	}

	data.description = validText(data.description) ? data.description : ''
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required'
	}

	if (Validator.isEmpty(data.start_date)) {
		errors.start_date = 'Start date field is required'
	}

	if (Validator.isEmpty(data.end_date)) {
		errors.start_date = 'End date field is required'
	}

	data.location.location_address = validText(data.location.location_address) ? data.location.location_address : ''
	data.online_url = validText(data.online_url) ? data.online_url : ''
	if (Validator.isEmpty(data.location.location_address) && Validator.isEmpty(data.online_url)) {
		errors.location = 'Either location address or online url field are required'
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0
	}
}
