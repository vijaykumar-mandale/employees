import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
    },
    address: {
        type: String,
    },
    photo: {
        type: String,
    },
});

const employeeModel = mongoose.model("employees", employeeSchema);
export default employeeModel;