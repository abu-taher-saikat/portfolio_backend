const mongoose = require("mongoose");

const milestoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // general details
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "CustomerProject" , required: true}, // required true
    name: { type: String, required: true }, // required true
    description: { type: String, required: false },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
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
    upperArray : [{
        name : { type: String, required: true }, // required true
        description : { type: String, required: false },
        number : { type: Number, required: true }, // required true
    }],
    // inner array for. each sigle values in mile stone.
    innerArray : [{
        milestoneName : { type: String, required: true },  // required true
        upperArrayValue : {type : Number , required: true}, // required true
        milestoneStatus : { type: String, enum: ["In Progress", "Completed"], default: "In Progress" },
    }]

});

module.exports = mongoose.model("milestone", milestoneSchema);
