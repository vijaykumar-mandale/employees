import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import EmployeesContext from "../context/MainContext";

const EditEmployee = () => {
  const navigate = useNavigate();
//   const { getAllEmployees } = useContext(EmployeesContext);
  const { id } = useParams();

  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
    birthdate: "",
    address: "",
  });

  useEffect(() => {
    const getSingleEmployee = async () => {
      const res = await axios.get(
        `http://localhost:3001/api/v1/employees/${id}`
      );
      setInput(res.data.fetchEmployeeDetail);
    };
    getSingleEmployee();
  }, [id]);

  const [file, setFile] = useState([]);

  const formdata = new FormData();

  formdata.append("name", input.name);
  formdata.append("age", input.age);
  formdata.append("email", input.email);
  formdata.append("birthdate", input.birthdate);
  formdata.append("address", input.address);
  formdata.append("photo", file);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/api/v1/employees/${id}`, formdata);
    // getAllEmployees();
    navigate("/");
  };

  return (
    <div className="container flex items-center justify-content-center">
      <h2
        className="text-center text-white p-2 m-2"
        style={{ backgroundColor: "blue" }}
      >
        Edit User
      </h2>

      <form className="p-2 m-2 needs-validation" onSubmit={handleUpdate}>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={input.name}
              name="name"
              required
              pattern="[a-zA-Z\s]+"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={input.email}
              name="email"
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              min="18"
              max="100"
              className="form-control"
              id="age"
              placeholder="Enter Age"
              value={input.age}
              name="age"
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="birthdate">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="birthdate"
              value={input.birthdate}
              name="birthdate"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              value={input.address}
              name="address"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label>Photo</label>
            <input
              type="file"
              name="photo"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to={"/"}>
              <button className="btn btn-danger m-3">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
