const express = require("express");

const CustomerProjectController = require("../controllers/CustomerProjectController");
const checkAuth = require("../middlewares/check-auth");
const uploadMulter = require("../middlewares/multer");


const router = express.Router();

// create post.
router.post('/create', CustomerProjectController.createProject);
router.post('/delete/:id', CustomerProjectController.deleteProject);
router.get('/:projectId', CustomerProjectController.getAProject);
router.post('/update/:projectId', checkAuth , CustomerProjectController.updateProject);
router.post('/imageUpload', checkAuth, uploadMulter.array("projectImage",10), CustomerProjectController.imageUpload);

module.exports = router;
