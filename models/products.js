const mongoose = require('mongoose')
const connectDB = require('./db')



const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	imagePath: {
		type: String,
		required: true
	}
})


module.exports = mongoose.model('Product', productSchema)