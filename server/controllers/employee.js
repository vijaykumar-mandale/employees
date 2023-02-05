import employeeModel from "../models/employee.js";

class employeeController
{
    static getAllEmployees = async(req, res) => {
        // res.send("get all employees");
        const fetchAllEmployees = await employeeModel.find({});
        return res.status(200).json({fetchAllEmployees});
    };
    static createNewEmployee = async(req, res) => {
        // res.send("create new user");
        const {name, age, email, birthdate, address} = req.body;
        try {
            if(name && age && email){
                const isEmail = await employeeModel.findOne({email: email});
                if(!isEmail){

                    const newEmployee = employeeModel({
                        name,
                        age,
                        email,
                        birthdate,
                        address,
                        photo: req.file.filename,
                    });

                    const response = await newEmployee.save();
                    if(response){
                        return res.status(200).json({message: "Successfully new employee added"});
                    }
                }else{
                    return res.status(400).json({message: "Employee already exists"});
                }
            }else{
                return res.status(400).json({message: "Name, Age and Email fields are required"});
            }
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    };
}

export default employeeController;