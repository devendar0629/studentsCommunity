import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sentOn: {
        type: Date,
        required: [true,"sentOn field is required"]
    },
    messageBody: {
        type: String,
        required: [true,"messageBody cannot be empty"]
    },
    mediaFile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }
},{timestamps: true})

const Message = mongoose.models.messages || mongoose.model("messages",messageSchema)

export default Message