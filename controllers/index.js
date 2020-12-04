const Product = require('../models/products')


exports.home = (req, res) => {
	try{
		Product.find((err, docs)=>{
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