const { Router } = require('express');
const home       = require('../controllers/home');
const image      = require("../controllers/image");

const router = Router();

router.get('/',                          home.index);
router.get('/images/:image_id',          image.index);  //search images
router.post('/images',                   image.create); //upload images
router.post('/images/:image_id/like',     image.like); //like to an image
router.post('/images/:image_id/comment', image.comment); //comment to an image
router.delete('/images/:image_id',       image.deleteImg); //delete image

module.exports = router;