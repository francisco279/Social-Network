const path               = require('path');
const randomNumber       = require('../helpers/libs');
const fs                 = require("fs-extra");
const md5                = require("md5");
const { Image, Comment } = require("../models"); //Index of models
const model = require('../helpers/sidebar'); //sidebar

//search for individual image data
const index = async(req, res) => {
    
    let viewModel = 
    {
        image   : {},
        comments: {}
    };

    const image    = await Image.findOne({filename: {$regex: req.params.image_id} }) //search image by id(image name (with regular expression))
    if(image)
    {
        image.views        = image.views + 1; //we increase the views
        viewModel.image    = image;
        await image.save(); //save the new image data (views)
        const comments     = await Comment.find({image_id: image._id}); //load comments of the image 
        viewModel.comments = comments;
        viewModel          = await model(viewModel);
        res.render("image", viewModel);
    }
    else
    {
        res.redirect("/");
    }
    
};

//upload image
const create = async(req, res) => {

    const saveImage = async() => {
        const imageURL  = randomNumber();
        const images    = await Image.find({filename: imageURL}); //check if name of the file(imageURL) exists on mongoDB
        
        if(images.length > 0)
        {
            saveImage(); //execute saveImage again to generate a new imageURL
        }
        else
        {
            const imageTempPath = req.file.path;//image path
            const ext           = path.extname(req.file.originalname).toLocaleLowerCase(); //get extention from file
            const targetPath    = path.resolve(`src/public/upload/${imageURL}${ext}`); //save image
            //check image
            if(ext ===".png" || ext ===".jpg" || ext ===".jpeg" || ext ===".gif")
            {
                await fs.rename(imageTempPath, targetPath);
                //Save on database
                const newImg = new Image
                (
                    {
                        title       : req.body.title,
                        filename    : imageURL + ext,
                        description : req.body.description,
                        timestamp   : new Date(),
                    }
                );
                const imageSaved = await newImg.save();
                res.redirect("/images/" + imageURL);
            }
            else
            {
                await fs.unlink(imageTempPath); //delete image from temporal folder on server
                res.status(500).json({error: "Only images are allowed"});
            }
        }
    }
    
    saveImage();
};

//like to an image
const like = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image)
    {
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes});
    }
    else
    {
        res.status(500).json({error: "Internal Error"});
    }
};
//comment to an image
const comment = async(req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}}); //get image by id (image name)
    //if image exist, create a comment
    if(image)
    {
        const newComment    = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect("/images/" + image.uniqueId);
    }
    else
    {
        res.redirect("/");
    }
};
//delete image
const deleteImg = async(req, res) => {
    console.log(req.params.image_id);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image)
    {
        await fs.unlink(path.resolve("./src/public/upload/" + image.filename));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
    }
};

module.exports = 
{
    index,
    create,
    like,
    comment,
    deleteImg
}