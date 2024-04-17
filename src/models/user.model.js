import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username cannot be empty"],
        unique: [true,"Username must be unique"]
    },
    email: {
        type: String,
        required: [true,"Email cannot be empty"],
    },
    password: {
        type: String,
        required: [true,"Password cannot be empty"],
        minLength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "StudentsCommunity is Nice ..."
    },
    age: Number,
    dateOfBirth: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema) // To maintain consistency in NextJS , "users" name is used in model creation

export default User
