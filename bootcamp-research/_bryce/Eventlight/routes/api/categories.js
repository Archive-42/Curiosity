const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get('/', (req, res) => {
	Category.find()
		.sort({ name: 1 })
		.then(categories => res.json(categories))
		.catch(err => {
			res.status(404).json({ noCategoriesFound: 'No categories found' })
		})
})

module.exports = router
