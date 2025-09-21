const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const zod = require("zod");

// Signup
userRouter.post("/signup", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
        userName: zod.string().min(4)
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Invalid format",
            error: parseDataWithSuccess.error,
        });
    }

    const { email, password, firstName, lastName, userName } = parseDataWithSuccess.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // TODO: Save user in DB
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Signin
userRouter.post("/signin", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5)
    });

    const parseDataWithSuccess = requireBody.safeParse(req.body);

    if (!parseDataWithSuccess.success) {
        return res.status(400).json({
            message: "Invalid Data format"
        });
    }

    const { email, password } = parseDataWithSuccess.data;

    try {
        // TODO: Compare password with DB hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        res.json({ message: "User logged in successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
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
