const express = require("express");

const CustomerProjectController = require("../controllers/CustomerProjectController");

const router = express.Router();

// create post.
router.post('/create', CustomerProjectController.createProject);
router.post('/delete/:id', CustomerProjectController.deleteProject);



module.exports = router;
