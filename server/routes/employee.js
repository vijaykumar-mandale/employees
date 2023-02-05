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
router.post("/employees", upload.single("photo"), employeeController.createNewEmployee);

export default router;