const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Product} = require('../models/Product')
router.post('/products',async (req,res) => {
    try{
      let {title,description,price,image,category,rating} = req.body
      if(!title){
        return res.status(422).json({err:'title field is required'})
      }
      if(!description){
        return res.status(422).json({err:'description field is required'})
      }
      if(!price){
        return res.status(422).json({err:'price field is required'})
      }
      if(!image){
        return res.status(422).json({err:'image field is required'})
      }
      if(!category){
        return res.status(422).json({err:'category field is required'})
      }else if(! Product.schema.path('category').enumValues.includes(category)){
        return res.status(422).json({err:`category must be of options ${Product.schema.path('category').enumValues.join(', ')}`})
      }
      if(!rating){
        return res.status(422).json({err:'rating filed is manadatory'})
      }
      if(!rating.rate === undefined){
        return res.status(422).json({err:'rating.rate filed is manadatory'})
      }
      if(!rating.count === undefined){
        return res.status(422).json({err:'rating.count filed is manadatory'})
      }
      let newProd = await Product.create(req.body)
      return res.status(201).json({msg:'product created succesfully',data:newProd})
     
    }catch(err){
        return res.status(500).json({err:'product did not get created bro'})
    }
})

router.get('/products',async(req,res) => {
    try{
    let allProducts = await Product.find()
    return res.status(200).json({err:'product fethced succesfully',data:allProducts})
    }catch(err){
        return res.status(500).json({err:'producst did not fetched bro'})
    }
})

router.get('/products/:id',async(req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.send(`paramater is not a valid id`)
        }
    let singleProd = await Product.findById(req.params.id)
    if(!singleProd){
        return res.status(404).json({err:'product not found'})
    }
    return res.status(200).json({err:'singleProd fethced succesfully',data:singleProd})
    }catch(err){
        return res.status(500).json({err:'singleProd did not fetched bro'})
    }
})

router.put('/products/:id',async(req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.send(`paramater is not a valid id`)
        }
        if(! await Product.exists({_id:req.params.id})){
            return res.status(404).json({err:'product not found'})
        }
    let updateProd = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    return res.status(200).json({err:'updateProd fethced succesfully',data:updateProd})
    }catch(err){
        return res.status(500).json({err:'updateProd did not fetched bro'})
    }
})

router.delete('/products/:id',async(req,res) => {
    try{
        if(!mongoose.isValidObjectId(req.params.id)){
            res.send(`paramater is not a valid id`)
        }
        if(! await Product.exists({_id:req.params.id})){
            return res.status(404).json({err:'product not found'})
        }
    let deleteProd = await Product.deleteOne({_id:req.params.id})
    let remaingProd = await Product.find()
    
    return res.status(200).json({err:'product deleted  succesfully',data:remaingProd})
    }catch(err){
        return res.status(500).json({err:'product did not deleted bro'})
    }
})

module.exports = router