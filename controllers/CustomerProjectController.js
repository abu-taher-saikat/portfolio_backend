const mongoose = require("mongoose");
// const Project = require("../models/ProjectModel");
const CustomerProject = require("../models/CustomerProjectModel");
const cloudinary = require("cloudinary");
const {CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET} = process.env;

cloudinary.v2.config({
  cloud_name : "codebysaikat",
  api_key : 836716512294595,
  api_secret : "_uqK2Rsh5d01LxDRxaMRqtmT6L4"
})





// Create Project
// @@ EndPoint : /customerProject/create
// @@ Method : POST
// @@ Public
exports.createProject = async (req, res, next) => {
  console.log(req.body);
  const {projectName,projectDescription,projectTechnologies,clientDetails ,projectType, projectComments, projectAssignedTo, projectAssignedBy } = req.body;
  try{

    const project = new CustomerProject({
      _id: new mongoose.Types.ObjectId(),
      projectName : projectName,
      projectDescription: req.body.projectDescription,
      projectTechnologies: req.body.projectTechnologies,
      clientDetails: req.body.clientDetails,
      projectType:  req.body.projectType,
      projectComments: req.body.projectComments,
      projectAssignedTo: req.body.projectAssignedTo,
      projectAssignedBy: req.body.projectAssignedBy,
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};



// imageUpload
// @@ EndPoint : /customerProject/create
// @@ Method : POST
// @@ Public
exports.imageUpload = async (req, res, next) => {
  
};




// Delete Project
// @@ EndPoint : /customerProject/delete/:id
// @@ Method : POST
// @@ Public
exports.deleteProject = async (req, res, next) => {
  const id = req.params.id;
  try {
    await CustomerProject.deleteOne({ _id: id });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


// Get A Project
// @@ EndPoint : /customerProject/:projectId
// @@ Method : GET
// @@ Public
exports.getAProject = async (req, res, next) => {
  
  const id = req.params.projectId;
  try {
    const project = await CustomerProject.findById(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Update A Project
// @@ EndPoint : /customerProject/update/:projectId
// @@ Method : POST
// @@ Private
exports.updateProject = async (req, res, next) => {
  const id = req.params.projectId;
  let obj = req.body;

  if(req.body.projectUpdatedDate == null && req.body.projectUpdatedBy == null){
    obj.projectUpdatedDate = new Date();
    obj.projectUpdatedBy = req.userData.userId;
    console.log(req.userData);
  }

  try {
    let project = await CustomerProject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}