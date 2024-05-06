import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Media name cannot be empty"],
        },
        type: {
            type: String,
            required: [true, "Media type cannot be empty"],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        link: {
            type: String, // cloudinary link
            required: [true, "Media link cannot be empty"],
        },
    },
    { timestamps: true }
);

const Media = mongoose.models.medias || mongoose.model("medias", mediaSchema);

export default Media;
