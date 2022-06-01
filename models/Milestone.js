const mongoose = require("mongoose");
const CustomerProject = require("./CustomerProjectModel.js");

const innerArraySchema = mongoose.Schema({
    name : { type: String, required: true },  // required true
    parents : {type : Number , required: true}, // required true
    status : { type: String, enum: ["In Progress", "Completed" , "Not Started"], default: "Not Started" }
},{
    _id : false
})


const upperArraySchema = mongoose.Schema({
    name : { type: String, required: true }, // required true
    description : { type: String, required: false },
    number : { type: Number, required: true }, // required true
    subMilestone : [innerArraySchema]
},{
    _id : false
})


const milestoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // general details
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "customerProject" , required: true}, // required true
    name: { type: String, required: true }, // required true
    description: { type: String, required: false },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["In Progress", "Completed" , "Not Started"], default: "Not Started" },
    comments: { type: String, required: false },

    // complete details
    completedDate: { type: Date, required: false },
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    completedComments: { type: String, required: false },

    // update history
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedDate: { type: Date, default: Date.now },

    // delete features
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedDate: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    count : { type: Number, default: 0 },

    // will be the title milestone part names.
    milestone : [upperArraySchema],

});





module.exports = mongoose.model("milestone", milestoneSchema);
