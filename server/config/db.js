import mongoose from "mongoose";

const connectToMongo = async() => {
    const res = await mongoose.connect("mongodb+srv://vijay:U7AxCDtHlB9fKwEy@mern.ld7ujxl.mongodb.net/employees?retryWrites=true&w=majority")
    if(res){
        console.log("connected successfully");
    }
};

export default connectToMongo;