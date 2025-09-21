const {Router}=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const zod=require("zod");
const { Admin }=require("../db");
const { JWT_ADMIN_PASSWORD }=require("../config");

const adminRouter=Router();

adminRouter.post("/signup",async (req,res)=>{
    const requireBody=zod.object({
        email:zod.string().email().min(5),
        password:zod.string().min(5),
        firstName:zod.string().min(3),
        lastName:zod.string().min(3),
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message:"Invalid data format",
        });
    }
    const {email,password,firstName,lastName}=parseDataWithSuccess.data;

    const hashedPassword=await bcrypt.hash(password,10);
    try{
        await Admin.create({
            email,
            password:hashedPassword,
            firstName,
            lastName,
        });
        res.json({
            message:"Sign Up succedded"
        });

    }catch(err){
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

// Admin Signin
adminRouter.post("/signin", async (req, res) => {
    const requireBody = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(5)
    });

    const parsed = requireBody.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parsed.error
        });
    }

    const { email, password } = parsed.data;

    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(403).json({
                message: "Admin does not exist"
            });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(403).json({
                message: "Incorrect password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin._id, role: "admin" },
            JWT_ADMIN_PASSWORD, 
            { expiresIn: "1d" }
        );

        res.json({
            message: "Admin logged in successfully",
            token
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});


adminRouter.delete("/user/:id", (req, res) => {
    res.json({
        message: `User with id ${req.params.id} deleted`
    });
});



adminRouter.get("/reports",(req,res)=>{
    res.json({
        message:"Report user EndPoint"
    });
});

adminRouter.post("/broadcast",(req,res)=>{
    res.json({
        message:"Send announcement to user Endpoint"
    });
});

module.exports={adminRouter}