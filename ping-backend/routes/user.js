const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD }=require("../config");
const bcrypt = require("bcrypt");
const zod = require("zod");
const { User }=require("../db");

// Signup
userRouter.post("/signup", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        });
    }

    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        res.json({ message: "SignUp Succeeded" });
    } catch (err) {
        res.status(500).json({
            message: "Error while signing up",
            error: err.message,
        });
    }
});

// Signin
userRouter.post("/signin", async (req, res) => {
    // 1. Validate request body
    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
    });

    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid data format",
            errors: parseResult.error.errors,
        });
    }

    const { email, password } = parseResult.data;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        // 3. Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        //Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_USER_PASSWORD, 
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        
        res.json({
            message: "User logged in successfully",
            token,
        });

    } catch(err){
      console.log(err);
      if(err.code===11000){
        res.status(400).json({
            message:"User with this email already exists"
        });

      }else{
        res.status(500).json({
            message:"something went wrong"
        });
      }
    }
});

// Profile
userRouter.get("/profile", (req, res) => {
    res.json({ message: "View your Profile" });
});

userRouter.put("/profile", (req, res) => {
    res.json({ message: "Update your Profile" });
});

// Friends
userRouter.post("/friends", (req, res) => {
    res.json({ message: "Send Friend Request" });
});

userRouter.delete("/friends/:id", (req, res) => {
    res.json({ message: `Withdraw/Delete Friend Request for user ${req.params.id}` });
});

module.exports = { userRouter };
