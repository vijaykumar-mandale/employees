import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import userRoutes from "./routes/employee.js"
const app = express();

const PORT = process.env.PORT || 3001;

connectToMongo();

app.use(cors());

app.use(express.json());

// Function to serve all static files
// inside public directory.
app.use(express.static('public')); 

// Routes
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
