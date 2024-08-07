
const uploaderModel = require('../models/uploaderModel');
const { uploadSingleImage } = require('../middleWares/uploadImageMiddleWar');
// const { createCategory, getAll, updateOne, deleteOne, getOne, createOne } = require('./handlersFactory');
const sharp = require('sharp');
const expressAsyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const ApiFeatures = require('../utils/apiFeatures');



// @desc Resize Image That user input
exports.resizeImage = expressAsyncHandler(async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    console.log(req.user)
    const fileName = `storage-${Date.now()}-${Math.round(Math.random() * 1E9)}.png`;

    try {
        await sharp(req.file.buffer)
            .resize(900, 900)
            .toFormat('png')
            .png({ quality: 90 })
            .toFile(`uploads/storage/${fileName}`)

        req.body.image = fileName;
        next();
    } catch (error) {
        return next(new ApiError(`Error processing image: ${error.message}`, 500));
    }
});



//@Desc MiddleWare using multer to upload image to server
exports.imageUploader = uploadSingleImage('image')





// @desc    Create Image with user id
// @route   POST /api/v1/Images
// @access  Private/User
exports.CreateImagesToStock = expressAsyncHandler(async (req, res, next) => {
    try {
        req.body.user = req.user._id;
        const newFIle = await uploaderModel.create(req.body);

        if (!newFIle) {
            new ApiError(`Error creating image: ${error.message}`, 500)
        }

        res.status(200).json({ statue: true });
    } catch (error) {
        next(new ApiError(`Error creating image: ${error.message}`, 500));
    }
});



// @desc    get Images by id user
// @route   GET /api/v1/list
// @access  Private/User
exports.getAllImages = expressAsyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
        filter = req.filterObj;
    }

    // Build query
    const documentsCounts = await uploaderModel.countDocuments();
    const apiFeatures = new ApiFeatures(uploaderModel.find({ user: req.user._id }, filter), req.query,)
        .paginate(documentsCounts)
        .filter()

        .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const files = await mongooseQuery;

    res.status(200)
        .json({ results: files.length, paginationResult, data: files });

    // //1) filter Product by userid{get only Product belong this userID}
    // const Images = await uploaderModel.find({ user: req.user._id })

    // if (!Images) {
    //     return next(
    //         new ApiError(`There is no Images for this user  : ${req.user._id}`, 404)
    //     );
    // }

    // res.status(200).json({
    //     status: 'success',
    //     result: Images.length,
    //     data: Images,
    // });
})




// @desc    Delete specific category
// @route   DELETE /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.deleteimage = factory.deleteOne(uploaderModel)

// @desc    Get specific category
// @route   GET /api/v1/Prodcuts/:id
// @access    Protected/Admin
exports.getOneImage = factory.getOne(uploaderModel)