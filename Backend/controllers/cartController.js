const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {

    try {

        const cart =
            await Cart.findOne({
                user: req.params.userId
            }).populate("items.product");

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.addToCart = async (req, res) => {

    try {

        const { userId, productId, quantity } =
            req.body;

        let cart =
            await Cart.findOne({
                user: userId
            });

        if (!cart) {

            cart = await Cart.create({
                user: userId,
                items: []
            });
        }

        cart.items.push({
            product: productId,
            quantity
        });

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.removeFromCart = async (req, res) => {

    try {

        const cart =
            await Cart.findOne({
                user: req.params.userId
            });

        cart.items =
            cart.items.filter(
                item =>
                    item.product.toString() !==
                    req.params.productId
            );

        await cart.save();

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};