const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verified: true,
        });

        return res.status(201).json({
            message: "Registration successful. You can now login."
        });

    } catch (error) {
        console.error("Registration failed:", error.code || error.message);

        return res.status(500).json({
            message: "Unable to register user. Please try again.",
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(400).json({
        message: "Invalid email or password",
            });
        }

        if ((await bcrypt.compare(password, user.password))) {

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });

        } else {

            return res.status(400).json({
                message: "Invalid email or password",
            });

        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });

    }
};

// Get all users
const getUsers = async (req, res) => {
    try {

        const users = await User.find({}).select("-password");

        return res.json(users);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
};