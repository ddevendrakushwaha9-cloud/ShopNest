const User = require("../model/User");
const OTP = require("../model/otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

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
            verified: false,
        });

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Email message
        const message = `
        Welcome to ShopNest, ${name}!

        Thank you for registering with us.

        Your OTP for registration is: ${otp}`;

        // Remove old OTP if exists
        await OTP.deleteMany({ email });

        //otp store krna
        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
        });

        // Send email
        await sendEmail(
            email,
            "Welcome to ShopNest - Your OTP for Registration",
            message
        );
        
        // Send response
        return res.status(201).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
        });
    }
};

// email verification
const otpVerify = async(req, res)=>{
try{
    const {email, otp} = req.body;

    const otpDoc = await OTP.findOne({email});
    if (!otpDoc) {
    return res.status(400).json({
        message: "OTP not found",
    });
    }

    if (otpDoc.expiresAt < Date.now()) {
        await OTP.deleteOne({ email });
        return res.status(400).json({
            message: "OTP expired",
        });
    }

    if (otpDoc.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP",
        });
    }
    
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
        message: "User not found",
    });
    }
    user.verified = true;
    await user.save();
    
    
    await OTP.deleteOne({ email });
    return res.status(200).json({
        message: "email verified successfully",
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: 'server error',
        });
    }
}; 

//re-send OTP
const resendOtp = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Delete old OTP
        await OTP.deleteMany({ email });

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save new OTP
        await OTP.create({
            email,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        // Send email
        await sendEmail(
            email,
            "Your New OTP",
            `Your new OTP is ${otp}`
        );

        return res.json({
            message: "OTP sent successfully",
        });

    } catch (error) {

        return res.status(500).json({
            message: "Server Error",
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

        if (!user.verified) {
         return res.status(401).json({
         message: "Please verify your email first",
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
    getUsers,
    otpVerify,
    resendOtp
};