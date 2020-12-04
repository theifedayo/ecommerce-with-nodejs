const Product = require('../models/products')
const mongoose = require('mongoose')



const connectDB = async ()=>{
	try{
		const conn = await mongoose.connect('mongodb://localhost:27017/e-commerceDB', { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
			console.log("Express app connected to DB successfully")
		})
	}catch(error){
		console.error(error)
		process.exit(1)
	}
}

connectDB()

const products = [
	new Product({
		name: 'sneakers',
		description: 'dope snealers for real gees',
		price: 1500,
		imagePath: 'https://www.istockphoto.com/photo/modern-sport-shoes-gm623270836-109246411'
	}),
	new Product({
		name: 'watch',
		description: 'chain new watch',
		price: 3500,
		imagePath: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fluxury-watch&psig=AOvVaw032kJL1DYmmSTmkD5Nh-kD&ust=1606984295031000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjXo5Pxru0CFQAAAAAdAAAAABAD'
	}),
	new Product({
		name: 'sneakers again',
		description: 'raw sneakers for them real gees',
		price: 4000,
		imagePath: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gettyimages.com%2Fphotos%2Fsneakers&psig=AOvVaw1KnpxG0Zl76xWaK1IYV3ii&ust=1606984306582000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjomZjxru0CFQAAAAAdAAAAABAD'
	}),
	new Product({
		name: 'bag',
		description: 'red bag for them ladies',
		price: 6000,
		imagePath: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fhand%2Bbag&psig=AOvVaw1yM_xSdNecpYhZ9s-xlTf8&ust=1606984273420000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNir74nxru0CFQAAAAAdAAAAABAD'
	}),
	new Product({
		name: 'bag again',
		description: 'blue bag for them queens',
		price: 9000,
		imagePath: 'https://www.shutterstock.com/image-photo/blue-female-bag-on-white-background-1051595801'
	}),
	new Product({
		name: 'watch (leather)',
		description: 'leather watch for royal men',
		price: 12000,
		imagePath: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.gq-magazine.co.uk%2Fphotos%2F5dbc4d7c96d5cc0008ed8c55%2Fmaster%2Fw_1000%2Cc_limit%2F20191028-watch-guide-lange.jpg&imgrefurl=https%3A%2F%2Fwww.gq-magazine.co.uk%2Fgallery%2Fbest-mens-watches&tbnid=dbC7vcvMQ_pHOM&vet=12ahUKEwjLreeP8a7tAhVMlBoKHQ23AH4QMygOegUIARDvAQ..i&docid=GAlhZDGX01SarM&w=1000&h=1000&q=images%20of%20watches&ved=2ahUKEwjLreeP8a7tAhVMlBoKHQ23AH4QMygOegUIARDvAQ'
	}),

]


var done = 0
for (var i=0; i < products.length; i++){
	products[i].save((err, result)=>{
		done++
		if(done === products.length){
			exit()
		}
	})
}

const exit = () =>{
	mongoose.disconnect()
}