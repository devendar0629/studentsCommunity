// import mongoose from "mongoose"
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const resp = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`
        );

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log(
                "------------- MONGODB Connection Successfull ---------------"
            );
        });

        connection.on("error", () => {
            console.log("Error connecting to MONGODB");
            process.exit(1);
        });
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
};

export { connectDB };
