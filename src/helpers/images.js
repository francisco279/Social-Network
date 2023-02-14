const { Image } = require("../models");


//function returns the most popular images 
const populares = async() => {
    const images = await Image.find().limit(1).sort({likes: -1}); //9 images with more likes
    return images;
}

module.exports = populares;