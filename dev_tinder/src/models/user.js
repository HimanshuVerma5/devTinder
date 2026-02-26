const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        require:true,
        minLength:4,
        maxLength:50,
    },
    emailId:{
        type:String,
        lowercase:true,
        require:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }
        }
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not a valid gender type`,
        },
        // validate(value){
        //     if(!["male","female","other"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // }
    },
    photo:{
        type:String,
        default:"https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
    },
    about:{
        type:String,
        default:"Hey this is a default description"
    },
    skills:{
        type:[String],
    }
},{
    timestamps:true,
});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"DEV@Tinder$500",{
            expiresIn:"7d",
});
return token;
};
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPassWordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    )
    return isPassWordValid;
};


module.exports=mongoose.model("User",userSchema);