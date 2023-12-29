const express = require('express');
const router = express.Router();
const multer = require('multer');
const productModel = require('./Products');

// Where to save the image and setting the name of image to be saved
let storage = multer.diskStorage({
    destination:'./public/product_images',
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})

// Upload Setting
let upload = multer({
    storage: storage,
    // limits: { fieldSize: 10 * 1024 * 1024 },
    fileFilter:(req, file, cb)=>{
     if(
         file.mimetype == 'image/jpeg' ||
         file.mimetype == 'image/jpg' ||
         file.mimetype == 'image/png' ||
         file.mimetype == 'image/gif' ||
         file.mimetype == 'image/webp'
 
     ){
         cb(null, true)
     }
     else{
         cb(null, false);
         cb(new Error('Only jpeg,  jpg , png, and gif Image allow'))
     }
    },
    onError : function(err, next) {
        console.log('error', err);
        next(err);
    }
 })

router.get('/all', async (req,res)=>{
    const allProducts = await productModel.find({});

    res.json(allProducts);
})

router.post('/category', async (req,res)=>{
    const allProducts = await productModel.find({category: req.body.category});
    res.json(allProducts);
})

router.post('/search', async (req,res)=>{
    const allProducts = await productModel.find({});

    res.json(allProducts);
})

router.post('/add', upload.single('product_img'), async (req,res)=>{

    const category = req.body.category;
    const sub_category = req.body.sub_category;
    const product_name = req.body.product_name;
    const description = req.body.description;
    const original_price = req.body.original_price;
    const discounted_price = req.body.discounted_price;
    const specification1 = req.body.specification1;
    const specification2 = req.body.specification2;
    const specification3 = req.body.specification3;
    const specification4 = req.body.specification4;
    const specification5 = req.body.specification5;

    const image = req.file.originalname;
    const specifications = [];
    specifications.push(specification1);
    specifications.push(specification2 !== "" ? specification2: null);
    specifications.push(specification3 !== "" ? specification3 : null);
    specifications.push(specification4 !== "" ? specification4 : null);
    specifications.push(specification5 !== "" ? specification5 : null);

    const addedProduct = await productModel.create({
        category: category,
        sub_category: sub_category,
        product_name: product_name,
        description: description,
        original_price: original_price,
        discounted_price: discounted_price,
        product_image: image,
        specifications: specifications
    })

    res.json({addedProduct, error: false});
})

module.exports = router;