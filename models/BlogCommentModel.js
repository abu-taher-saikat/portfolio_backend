const mongoose = require("mongoose");

const blogCommentSchema = mongoose.Schema({
    comment: { type: String, required: true },
    commentDate: { type: Date, default: Date.now },
    commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commentDeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commentDeletedDate: { type: Date, default: Date.now },
    commentUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commentUpdatedDate: { type: Date, default: Date.now },
    commentLikeCount: { type: Number, default: 0 },
    commentReply : [{
        commentReply: { type: String, required: true },
        commentReplyDate: { type: Date, default: Date.now },
        commentReplyBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commentReplyDeletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commentReplyDeletedDate: { type: Date, default: Date.now },
        commentReplyUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        commentReplyUpdatedDate: { type: Date, default: Date.now },
        commentReplyLikeCount: { type: Number, default: 0 }
    }];
});

module.exports = mongoose.model("Blog", blogCommentSchema);
