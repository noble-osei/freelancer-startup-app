import express from "express";
import Joi from "joi";

import { createTask, deleteTask, getTask, getTasks, 
  updateTask } from "../../controllers/taskController.js";
import auth from "../../middleware/auth.js";
import requireRole from "../../middleware/requireRole.js";
import Validate from "../../middleware/validate.js";
import { projectIdParamsSchema } from "../../validators/projectSchema.js";
import { createTaskBodySchema, tasksIdParamsSchema, updateTaskBodySchema } from "../../validators/taskSchema.js";

const router = express.Router({ mergeParams: true });

router.use(auth);
router.use(requireRole(["admin", "user"]));

router.route("/")
  .get(Validate.params(projectIdParamsSchema), getTasks)
  .post(Validate.params(projectIdParamsSchema), Validate.body(createTaskBodySchema), createTask );

router.route("/:id")
  .get(Validate.params(tasksIdParamsSchema), getTask )
  .patch(Validate.params(tasksIdParamsSchema), Validate.body(updateTaskBodySchema), updateTask)
  .delete(Validate.params(tasksIdParamsSchema), deleteTask);

export default router