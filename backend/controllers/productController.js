const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');


const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        return res.json(products);
    }
    catch(error){
        return res.status(500).json({message: "server error"});
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({
            message: "Invalid Product ID",
        });
    }
};

const createProduct = async (req, res) =>{
    try{
        const { name, description, price, category, stock} = req.body;
        let imageUrl = '';
        let imagePublicId = "";
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            imageUrl = result.secure_url;
            imagePublicId = result.public_id;
        }
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
            imagePublicId,
        });
        const savedProduct = await product.save();
        return res.status(201).json(savedProduct);
    }
    catch(error){
        return res.status(500).json({message: 'Server Error'});
    }
};
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        if (req.file) {
            // Delete old image
            if (product.imagePublicId) {
                await cloudinary.uploader.destroy(product.imagePublicId);
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            product.imageUrl = result.secure_url;
            product.imagePublicId = result.public_id;
        }

        const updatedProduct = await product.save();

        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const deleteProduct = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            message: "Product not found",
        });
    }
    // Delete image from Cloudinary
    if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
    }
    // Delete product from MongoDB
    await product.deleteOne();
    
    return res.json({
        product,
        message: 'Product Removed'
    });
    }catch(error){
        return res.status(500).json({message: 'Server Error'})
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};