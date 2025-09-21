const express=require("express");

const app=express();


app.use("api/v1/user",userRouter);
app.use("api/v1/admin",adminRouter);

app.listen(3000,()=>{
    console.log("sever started at port 3000");
})