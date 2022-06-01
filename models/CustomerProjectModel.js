const mongoose = require("mongoose");

const CustomerProjectSchema = mongoose.Schema({
    // prject details.
    projectName: { type: String, required: true },
    projectDescription: { type: String, required: true },
    projectTechnologies: { type: String, required: true },
    projectLink: { type: String, required: false },
    projectImage: { type: Array, required: false },
    projectDate: { type: Date, default: Date.now },
    clientDetails: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    projectStatus: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
    projectType: { type: String, enum: ["Web", "Mobile", "Desktop", "Extension", "Software"], default: "Web" },
    projectPriority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    projectComments: { type: String, required: false },
    projectAssignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectAssignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectAssignedDate: { type: Date, default: Date.now },

    // complete details.
    projectCompletedDate: { type: Date, required: false },
    projectCompletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectCompletedComments: { type: String, required: false },

    // creation details.
    projectCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectCreatedDate: { type: Date, default: Date.now },

    // update details
    projectUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectUpdatedDate: { type: Date, default: Date.now },

    // delete details.
    projectDeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectDeletedDate: { type: Date, default: Date.now },
    projectDeleted: { type: Boolean, default: false },

    // milestone details.
    projectMilestone : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "milestone"
    }
});

module.exports = mongoose.model("customerProject", CustomerProjectSchema);
