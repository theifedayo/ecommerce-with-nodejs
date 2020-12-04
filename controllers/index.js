const Product = require('../models/products')
const Cart = require('../models/cart')


exports.home = async (req, res) => {
	try{
		await Product.find((err, docs)=>{
			if(!err){
				// To get 3 products each row
				const rowSize = 3
				const productsChunk = []
				for(var i = 0; i < docs.length; i += rowSize){
					productsChunk.push(docs.slice(i, i + rowSize))
				}
				// console.log(docs)
				res.render('shop/index', {products: productsChunk})
			}else{
				console.log(err)
				//process.exit(1)
			}
			
			
		})
	}catch(error){
		console.log(error)
	}
}

exports.cartView = (req, res)=>{
	const productId = req.params.id
	const cart = new Cart(req.session.cart ? req.session.cart : {})

	Product.findById(productId, (err, product)=>{
		if(err){
			return res.redirect('/')
		}else{
			cart.add(product, product.id)
			req.session.cart = cart
			console.log(req.session.cart)
			res.redirect('/')
		}
	})
}










exports.adminGetCreateView = (req, res)=>{
	res.render('admin/product-create')
}

exports.adminCreateProduct = async (req, res, next) =>{
	try{
	
		const newProduct = await new Product()

		newProduct.name = req.body.name
		newProduct.description = req.body.description
		newProduct.price = req.body.price
		newProduct.imagePath = req.body.imagePath
		

		newProduct.save((err, result)=>{
			if (err){
				res.render('admin/product-create',{
					product: req.body
				})
				// console.error(err)
				// process.exit(1)
			}
			res.redirect('/')
		})

		
	}catch(error){
		console.error(error)
		res.status(500).json({ error: 'Server error'})
	}

}