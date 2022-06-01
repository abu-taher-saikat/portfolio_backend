const express = require("express");

const ProjectController = require("../controllers/ProjectController");
const uploadMulter = require("../middlewares/multer");
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post(
  "/", uploadMulter.array("projectImage",10),
  ProjectController.addProject
);

router.get("/:projectId", ProjectController.getOneProject);
router.get("/", ProjectController.getAllProjects);
router.delete("/:projectId",ProjectController.deleteProject);
router.put(
  "/:projectId",
  uploadMulter.single("projectImage"),
  ProjectController.updateProject
);

module.exports = router;
