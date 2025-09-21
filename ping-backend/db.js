const mongoose=require("mongoose");

console.log("connected to");
const Schema=mongoose.Schema;

const ObjectId=Schema.Types.ObjectId;

const userSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:String,
    lastName:String,
    friends:[{type:ObjectId,ref:"User"}],

},
{timestamps:true}
);

const adminSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:String,
    lastName:String,
    role:{type:String,default:"admin"},
},{timestamps:true});


const messageSchema=new Schema({
    sender:{type:ObjectId,ref:"User",required:"true"},
    chat:{type:ObjectId,ref:"Chat",required:"true"},
    content:{type:String,required:true},
    type:{type:String,enum:["text","image","video"],default:"text"},
    isRead:{type:Boolean,default:false},
    selfDestruct:{type:Boolean,default:false},// for stealth mode
});

const chatSchema=new Schema({
    chatName:{type:String},
    isGroupChat:{type:Boolean,default:false},
    users:[{type:ObjectId,ref:"User"}],//members of chat
    latestMessage:{type:ObjectId,ref:"Message"},
    groupAdmin:{type:ObjectId,ref:"User"},

},{timestamps:true});

//models

const User=mongoose.model("User",userSchema);
const Admin=mongoose.model("Admin",adminSchema);
const Chat=mongoose.model("Chat",chatSchema);
const Message=mongoose.model("Message",messageSchema);

module.exports={
    User,
    Admin,
    Chat,
    Message
};