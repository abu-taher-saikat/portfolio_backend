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

exports.getOneProject = async (req, res, next) => {
  const id = req.params.projectId;
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: err });
  }
};



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




const updateProject = async (req, res, next) => {
  const id = req.params.projectId;
   var projectSearch;
  try {
    projectSearch = await Project.findById(id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  var filePath;
  if (req.file === undefined) {
    filePath = projectSearch.projectImage;
  } else {
    filePath = req.file.path;
  }

  mongoose.set("useFindAndModify", false);
  Project.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies,
      haveLink: req.body.haveLink,
      link: req.body.link,
      projectImage: filePath,
    },
    { new: true },
    function (err, project) {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res
          .status(200)
          .json({ message: "Project updated successfully", project });
      }
    }
  );
};

