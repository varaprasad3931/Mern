const User = require("../models/User");

exports.getUsers = async (req, res) => {

    try {

        const users =
            await User.find()
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getUserById = async (req, res) => {

    try {

        const user =
            await User.findById(req.params.id)
            .select("-password");

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message: "User Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};