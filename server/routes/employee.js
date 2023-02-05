import express from "express";
import employeeController from "../controllers/employee.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage});

router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/:id", employeeController.getEmployeeDetail);
router.put("/employees/:id", upload.single("photo"), employeeController.updateEmployee);
router.post("/employees", upload.single("photo"), employeeController.createNewEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

export default router;