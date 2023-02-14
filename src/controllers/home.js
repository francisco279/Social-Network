const { Image } = require("../models"); //get the models
const model   = require("../helpers/sidebar");

const index = async(req, res) => {
    const images     = await Image.find().sort({timestamp: -1}); //consult all the images
    let viewModel    = {images: []}; //create a viewmModel with an empty array of images
    viewModel.images = images; //fill the viewModel with the images
    viewModel        = await model(viewModel);
    res.render("index", viewModel); //pass tbe images to the index view
};

module.exports = 
{
    index
}

