const express = require('express')
const router = express.Router()
const Type = require('../../models/Type')

router.get('/', (req, res) => {
	Type.find()
		.sort({ name: 1 })
		.then(types => res.json(types))
		.catch(err => {
			res.status(404).json({ noTypesFound: 'No types found' })
		})
})

module.exports = router
