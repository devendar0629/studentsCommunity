import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name is required"]
    },
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
    avatar: {
        type: String, // cloudinary url
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "StudentsCommunity is Nice ..."
    },
    gender: {
        type: String,
        enum: ['MALE','FEMALE','RATHER-NOT-SAY'],
        required: [true,"Gender cannot be empty"],
    },
    joinedGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ],
    age: Number,
    dateOfBirth: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    refreshToken: String
},{timestamps: true})

const User = mongoose.models.users || mongoose.model("users",userSchema) // To maintain consistency in NextJS , "users" name is used in model creation

export default User
