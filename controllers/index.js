const Product = require('../models/products')


exports.home = async (req, res) => {
	try{
		const prod = await Product.find((err, docs)=>{
			if(!err){
				//To get 3 products each row
				const rowSize = 3
				const productsChunk = []
				for(var i = 0; i < docs.length; i += rowSize){
					productsChunk.push(docs.slice(i, i + rowSize))
				}
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