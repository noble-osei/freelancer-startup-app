import express from "express";

import auth from "../middleware/auth.js";
import { createProject, deleteProject, getProjects, 
         updateProject } from "../controllers/projectController.js";
import Validate from "../middleware/validate.js";
import { idSchema, projectBodySchema } from "../validation/validationSchemas.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

router.route("/")
      .get(auth, requireRole(["admin", "user"]), getProjects)
      .post(auth, requireRole(["admin"]), Validate.body(projectBodySchema), createProject);

router.route("/:id")
      .put( auth, requireRole(["admin", "user"]), Validate.params(idSchema), 
            Validate.body(projectBodySchema), updateProject)
      .delete( auth, requireRole(["admin"]), deleteProject);

export default router