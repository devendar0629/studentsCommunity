import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    refreshToken: String
},{
    timestamps: true
})

const Token = mongoose.models?.tokens || mongoose.model('tokens',tokenSchema)

export default Token