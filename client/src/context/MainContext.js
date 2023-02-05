import { createContext } from "react";
import { useState, useCallback } from "react";
import axios from "axios";
const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  // manage Employees
  const [employees, setEmployees] = useState([]);

  const getAllEmployees = useCallback(async () => {
    const res = await axios.get("http://localhost:3001/api/v1/employees");
    
    setEmployees(res.data.fetchAllEmployees);
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees, getAllEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;