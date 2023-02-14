const { Comment, Image } = require("../models");

//get the images with more comments
const newest = async() => {
    const comments = await Comment.find().limit(5).sort({timestamp: -1}); //get 5 comments newest

    for (const comment of comments)
    {
        const image = await Image.findOne({_id: comment.image_id});
        comment.image = image;
    }

    return comments;
};

module.exports = newest;