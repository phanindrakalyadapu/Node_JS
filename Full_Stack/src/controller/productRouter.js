let express = require('express');
let productRouter = express.Router();
let mongo = require('mongodb')
let {getData} = require('./dbcontroller');
function router (menu){

    productRouter.route('/')
        .get(async function(req,res){
            let qurey ={};
            let products = await getData('products',qurey)
        res.render('products',{title: 'Products Page', products,menu})
    })

    productRouter.route('/list/:id')
    .get(async function(req, res){
        let id = req.params.id
        let query = {"category_id":Number(id)}
        let products = await getData('products',query)
        res.render('products',{title: 'Products Page', products,menu})
    })
    

productRouter.route('/details/:id')
    .get(async function(req,res){
        let {id} = req.params;
        let query = {_id:mongo.ObjectId(req.params.id)}
        let products = await getData('products',query)
        res.render('products',{title:'Products Page',products,menu})
       
    })

    return productRouter
}

module.exports = router