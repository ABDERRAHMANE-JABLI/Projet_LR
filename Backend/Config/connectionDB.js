import { connect } from "mongoose";

const ConnectionDB = async () => {
    try {
        await connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to Database MongoDB");
    } catch (error) {
        console.error("Connection failed to database", error);
    }
};

export default ConnectionDB;