const mongoose = require("mongoose");
// const Project = require("../models/ProjectModel");
const Milestone = require("../models/Milestone");
const CustomerProject = require("../models/CustomerProjectModel");

const cloudinary = require("cloudinary");
const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;

cloudinary.v2.config({
  cloud_name : "codebysaikat",
  api_key : 836716512294595,
  api_secret : "_uqK2Rsh5d01LxDRxaMRqtmT6L4"
})



// Create A Milestone
// @@ EndPoint : /milestone/create
// @@ Method : POST
// @@ Public
exports.createMilestone = async (req, res, next) => {
  const {projectId , name, description, status ,comments, milestone } = req.body;

  // console.log(req.body);
  try{

    // if there is no project id.
    if(!projectId){
      return res.status(400).json({
        message: "Project Id is required"
      });
    }

    // find if this project id already have a milestone.
    // const project = await Milestone.findOne({projectId: projectId});
    // if(project){
    //   return res.status(400).json({
    //     message: "Project already have a milestone"
    //   });
    // }

    // create the milestone.
    const setMilestone = new Milestone({
      _id: new mongoose.Types.ObjectId(),
      projectId ,
      name,
      description,
      status,
      comments,
      milestone
    });

    // set the milestone id to the customer project model.
    const customerProject = await CustomerProject.findOneAndUpdate({_id: projectId}, {projectMilestone: setMilestone._id}, {new: true});

    console.log(customerProject);
    await setMilestone.save();

    res.status(201).json(setMilestone);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};




// Delete Project
// @@ EndPoint : /customerProject/delete/:id
// @@ Method : POST
// @@ Public
exports.deleteMilestone = async (req, res, next) => {
  const id = req.params.milestoneId;
  try {
    await Milestone.deleteOne({ _id: id });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


// Get A Project
// @@ EndPoint : /customerProject/:projectId
// @@ Method : POST
// @@ Public
exports.getAMilestone = async (req, res, next) => {
  const id = req.params.milestoneId;
  try {
    const milestone = await Milestone.findById(id).populate("projectId")
    console.log(milestone);
    res.status(200).json(milestone);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update A Project
// @@ EndPoint : /milestone/update/:milestoneId
// @@ Method : POST
// @@ Private
exports.updateMilestone = async (req, res, next) => {
  const id = req.params.milestoneId;
  let obj = req.body;

  if(req.body.updatedBy == null && req.body.updatedDate == null){
    obj.updatedDate = new Date();
    obj.projectUpdatedBy = req.userData.userId;
  }


  try {
    let project = await Milestone.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}