const express = require("express");

const CustomerProjectController = require("../controllers/CustomerProjectController");
const uploadMulter = require("../middlewares/multer");
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// create post.
router.post('/create', protect , authorize('admin', 'customer'), CustomerProjectController.createProject);
router.post('/delete/:id', protect , authorize('admin'), CustomerProjectController.deleteProject);
router.get('/:projectId', CustomerProjectController.getAProject);
router.post('/update/:projectId', protect, authorize('admin', 'customer') ,CustomerProjectController.updateProject);
router.post('/imageUpload', protect, authorize('admin', 'customer'), uploadMulter.array("projectImage",10), CustomerProjectController.imageUpload);

module.exports = router;
