const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type:String,
            required:[true, "Please add a title"]
        },
        content: {
            type:String,
            required:[true, "Please add the content"]
        },
        author: {
            type:String,
            required:[true, "Please add the author"]
        }
    },
    {
        timestamps:true
    }
)


module.exports = mongoose.model("Blog", blogSchema)