const express = require("express");

const MilestoneController = require("../controllers/MilestoneController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

// create post.
router.post('/create', MilestoneController.createMilestone);
router.post('/update/:milestoneId', checkAuth , MilestoneController.updateMilestone);
router.post('/delete/:milestoneId',checkAuth, MilestoneController.deleteMilestone);
router.get('/:milestoneId',checkAuth, MilestoneController.getAMilestone);



module.exports = router;
