const totalStats = require("./stats");
const newest     = require("./comments");
const populares = require("./images");

//function to get all the stats of the images
const model = async(viewModel) => {
    const results = await Promise.all([totalStats(), populares(), newest()]);
    

    viewModel.sidebar = {
        stats    : results[0],
        popular  : results[1],
        comments : results[2],
        
    };

    return viewModel;
};

module.exports = model;