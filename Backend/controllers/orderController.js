const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
    try {
        const order = await Order.create({
            ...req.body,
            user: req.user.id
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate("orderItems.product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOrders = async (req, res) => {

    try {

        const orders =
            await Order.find()
            .populate("user")
            .populate("orderItems.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getOrderById = async (req, res) => {

    try {

        const order =
            await Order.findById(req.params.id)
            .populate("user")
            .populate("orderItems.product");

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateOrderStatus = async (req, res) => {

    try {

        const order =
            await Order.findByIdAndUpdate(
                req.params.id,
                {
                    orderStatus:
                        req.body.orderStatus
                },
                { new: true }
            );

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteOrder = async (req, res) => {

    try {

        await Order.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "Order Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};