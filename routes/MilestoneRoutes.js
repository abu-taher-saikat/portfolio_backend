const express = require("express");

const MilestoneController = require("../controllers/MilestoneController");
// const checkAuth = require("../middlewares/check-auth");
const { protect, authorize } = require('../middlewares/auth');


const router = express.Router();

// create post.
router.post('/create', protect , authorize('admin' , 'customer'), MilestoneController.createMilestone);
router.post('/update/:milestoneId', protect , authorize('admin' , 'customer') , MilestoneController.updateMilestone);
router.post('/delete/:milestoneId', protect , authorize('admin' , 'customer'), MilestoneController.deleteMilestone);
router.get('/:milestoneId', protect, MilestoneController.getAMilestone);



module.exports = router;
