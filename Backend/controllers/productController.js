const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    try {
        let query = {};
        if (req.query.category && req.query.category !== "all") {
            const Category = require("../models/Category");
            // Perform case-insensitive match on category name
            const cat = await Category.findOne({
                name: { $regex: new RegExp("^" + req.query.category + "$", "i") }
            });
            if (cat) {
                query.category = cat._id;
            } else {
                return res.status(200).json([]);
            }
        }
        const products = await Product.find(query).populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getProductById = async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id)
            .populate("category");

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.createProduct = async (req, res) => {

    try {

        const product =
            await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateProduct = async (req, res) => {

    try {

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {

    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};