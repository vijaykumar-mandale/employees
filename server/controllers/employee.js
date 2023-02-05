import employeeModel from "../models/employee.js";

class employeeController {
  static getAllEmployees = async (req, res) => {
    // res.send("get all employees");
    const fetchAllEmployees = await employeeModel.find({});
    return res.status(200).json({ fetchAllEmployees });
  };
  static getEmployeeDetail = async (req, res) => {
    // res.send("get single employee");
    const id = req.params.id;
    try {
      const fetchEmployeeDetail = await employeeModel.findById(id);
      if (fetchEmployeeDetail) {
        return res.status(200).json({ fetchEmployeeDetail });
      } else {
        return res.status(400).json({ message: "Employee not exists" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static createNewEmployee = async (req, res) => {
    // res.send("create new employee");
    const { name, age, email, birthdate, address } = req.body;
    let photo;
    if (req.file.filename) {
      photo = req.file.filename;
    } else {
      photo = "";
    }
    try {
      if (name && age && email) {
        const isEmail = await employeeModel.findOne({ email: email });
        if (!isEmail) {
          const newEmployee = employeeModel({
            name,
            age,
            email,
            birthdate,
            address,
            photo: photo,
          });

          const response = await newEmployee.save();
          if (response) {
            return res
              .status(200)
              .json({ message: "Successfully new employee added" });
          }
        } else {
          return res.status(400).json({ message: "Employee already exists" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Name, Age and Email fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static updateEmployee = async (req, res) => {
    // res.send("update employee");
    const { name, age, email, birthdate, address } = req.body;
    const id = req.params.id;
    let photo;
    if (req.file.filename) {
      photo = req.file.filename;
    } else {
      photo = "";
    }
    try {
      if (name && age && email) {
        employeeModel.findByIdAndUpdate(
          req.params.id,
          {
            name,
            age,
            email,
            birthdate,
            address,
            photo,
          },
          { new: true },
          function (err, result) {
            if (err) {
              return res
                .status(400)
                .json({ message: "Employee update failed" });
            }

            if (result) {
              return res
                .status(200)
                .json({ message: "Successfully employee updated" });
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ message: "Name, Age and Email fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static deleteEmployee = async (req, res) => {
    //  res.send("Delete user");
    // console.log("User id", req.params.id);
    const id = req.params.id;
    try {
      if (id) {
        const isEmpID = await employeeModel.findById(id);
        if (isEmpID) {
          const employeeDeleted = await employeeModel.findByIdAndRemove(id);
          return res.status(200).json({
            message: "Employee deleted successfully",
          });
        } else {
          return res.status(400).json({ message: "Employee not exists" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Employee ID is required to delete" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default employeeController;
