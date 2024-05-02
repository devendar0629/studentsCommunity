import mongoose from "mongoose"

const connectDB = async () => {
    try {
        console.log('===== Trying Db');
        const resp = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`);
        console.log('===== Connected to Db');
        resp.connection.listCollections().then((data) => console.log(data));

        // const connection = mongoose.connection

        // connection.on("connected", () => {
        //     console.log("------------- MONGODB Connection Successfull ---------------");
        // })

        // connection.on("error", () => {
        //     console.log("Error connecting to MONGODB");
        //     process.exit(1);
        // })
    } catch (error: any) {
        console.log(error.message);
    }
}

export { connectDB }