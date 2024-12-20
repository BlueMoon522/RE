import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected to :${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectMongoDB;
