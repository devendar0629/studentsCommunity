import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Group name cannot be empty"]
    },
    description: {
        type: String,
        default: ''
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"admin field cannot be empty"]
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true,"createdBy field cannot be empty"]
    },
},{timestamps: true})

const Group = mongoose.models.groups || mongoose.model("groups",groupSchema)

export default Group