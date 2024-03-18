import controllers from "./controllers.js";
import express from "express";

const router = express.Router();

router.get("/todos", controllers.listTask);
router.get("/todos/:id", controllers.listOneTask);

router.post("/todos/", controllers.createTask);

router.put("/todos/:id", controllers.updateTask);

router.delete("/todos/:id", controllers.deleteTask);

export default router;