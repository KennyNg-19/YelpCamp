// comment's schema and collection
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// return the collection
module.exports = mongoose.model("Comment", commentSchema);
