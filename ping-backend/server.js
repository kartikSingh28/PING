require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

const app = express();


app.use(express.json()); 

// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Connected to MongoDB");
        app.listen(3000, () => {
            console.log("🚀 Server started at port 3000");
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
    }
}

main();
