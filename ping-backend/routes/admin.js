const {Router}=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const zod=require("zod");

const adminRouter=Router();

adminRouter.post("/Signup",async (req,res)=>{
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

});

adminRouter.post("/Signin",async (req,res)=>{
    const requireBody=zod.object({
        email:zod.string().email().min(5),
        password:zod.string().min(5),
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message:"Invalid data format"
        });
    }

    const {email,password}=parseDataWithSuccess.data;

    const hashedPassword=await bcrypt.hash(password,10);

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