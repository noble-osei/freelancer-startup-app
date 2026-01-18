import express from "express";
import Joi from "joi";

import auth from "../middleware/auth.js";
import { createProject, deleteProject, getProject, getProjects,
      updateProject
} from "../controllers/projectController.js";
import { createProjectBodySchema, updateProjectBodySchema, 
      projectIdParamsSchema
 } from "../validators/projectSchema.js";
import Validate from "../middleware/validate.js";
import requireRole from "../middleware/requireRole.js";
import taskRoutes from "./taskRoutes/taskRoutes.js";

const router = express.Router();

router.use(auth);

router.route("/")
      .get(requireRole(["admin", "user"]), getProjects)
      .post(requireRole(["admin"]), Validate.body(createProjectBodySchema), createProject);

router.route("/:projectId")
      .patch(requireRole(["admin", "user"]), Validate.params(projectIdParamsSchema),
            Validate.body(updateProjectBodySchema), updateProject)
      .get(requireRole(["admin", "user"]), Validate.params(projectIdParamsSchema), getProject)
      .delete(requireRole(["admin"]), Validate.params(projectIdParamsSchema), deleteProject);

router.use("/:projectId/tasks", taskRoutes);

export default router