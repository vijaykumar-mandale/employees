import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import EmployeesContext from "../context/MainContext";
import { Link } from "react-router-dom";
const Home = () => {
  const { employees, setEmployees, getAllEmployees } =
    useContext(EmployeesContext);

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  // Delete a Employee

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/v1/employees/${id}`);

    const remainingEmployees = employees.filter((employee) => {
      return employee._id !== id;
    });
    setEmployees(remainingEmployees);
    alert("Employee deleted successfully");
  };
  return (

                <div className="container flex items-center justify-content-center">
      <h2
        style={{ backgroundColor: "blue" }}
        className="text-center text-white p-2 m-2"
      >
        Employees Management System
      </h2>
      <Link to={"/add"}>
        <button className="btn btn-primary">
          <i className="fa fa-home" />
          &nbsp; Add Employee
        </button>
      </Link>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Email</th>
                      <th scope="col">Date of Birth</th>
                      <th scope="col">Address</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(employees).length > 0 ? (
                      employees.map((employee, index) => {
                        return (
                          <tr>
                            <th scope="row">{index+1}</th>
                            <td>{employee.name}</td>
                            <td>{employee.age}</td>
                            <td>{employee.email}</td>
                            <td>{employee.birthdate}</td>
                            <td>{employee.address}</td>
                            <td>
                              <img
                                src={`http://localhost:3001/${employee.photo}`}
                                alt="Employee Profile"
                                className="img img-rounded"
                                height="100px"
                                width="100px"
                              />
                            </td>
                            <td>
                              <Link to={`/edit/${employee._id}`}>
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  <i className="fa fa-pencil"></i> Edit
                                </button>
                              </Link>
                              <button
                                onClick={() => handleDelete(employee._id)}
                                type="submit"
                                className="btn btn-danger ms-1"
                              >
                                <i className="fa fa-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td>No Employees Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
  );
};

export default Home;
