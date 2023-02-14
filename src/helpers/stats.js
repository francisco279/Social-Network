const { Comment, Image } = require("../models");

//get total of images
const imageCounter = async() => {
    return await Image.countDocuments();
};
//get total of comments
const commentsCounter = async() => {
    return await Comment.countDocuments();
};
//get totall views of the images
const imagesTotalViewsCounter = async() => {
    const result = await Image.aggregate([{$group: {
       _id: "1",
       viewsTotal: {$sum: "$views"} 
    }
    }]);
    return result[0].viewsTotal;
};

//get total likes of the images
const likesTotalCounter = async() => {
    const result = await Image.aggregate([{$group: {
        _id: "1",
        likesTotal: {$sum: "$likes"} 
     }
     }]);
     return result[0].likesTotal;
};

const totalStats = async() => {
    const results = await Promise.all
    (
        [
            imageCounter(),
            commentsCounter(),
            imagesTotalViewsCounter(),
            likesTotalCounter()
        ]
    )

    return {
        images   : results[0],
        comments : results[1],
        views    : results[2],
        likes    : results[3]  
    }
}

module.exports = totalStats;
