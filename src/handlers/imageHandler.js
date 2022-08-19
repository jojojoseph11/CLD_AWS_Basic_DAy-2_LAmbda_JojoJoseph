const services = require("../services/userService");
const fs = require("fs");
const responseHandler = require("./responseHandler");

// Upload image
module.exports.uploadImage = async (event) => {
    let fileName = JSON.parse(event.body).filename;
    try {
        let results = await services.uploadImageService(fileName);
        return responseHandler.success("successfully uploaded image",
            null);
    }
    catch (error) {
        return responseHandler.error("Couldnot upload image",
            error)
    }
};

// Get image from s3 bucket
module.exports.getImage = async (event) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.getImageService(fileName);
        return responseHandler.success("successfully retrieved image",
            results)
    }
    catch (error) {
        return responseHandler.error("Couldnot retrieve image",
            error)
    }
};

// List all images
module.exports.listImages = async () => {
    try {
        let results = await services.listImageService();
        return responseHandler.success("successfully retrieved images",
            results.Contents.map(a => a.Key))
    }
    catch (error) {
        return responseHandler.error("Couldnot retrieve images",
            error)
    }
};

// Update image
module.exports.updateImage = async (event) => {
    let fileName = JSON.parse(event.body).filename;
    try {
        let results = await services.uploadImageService(fileName);
        return responseHandler.success("Image successfully updated",
            null)
    }
    catch (error) {
        return responseHandler.error("Couldnot update image",
            error)
    }
};

// Delete Image
module.exports.deleteImage = async (event) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.deleteImageService(fileName);
        return responseHandler.success("Successfully deleted image",
            null)
    }
    catch (error) {
        return responseHandler.error("Couldnot delete image",
            error)
    }
};

// Get image public URL from s3 bucket
module.exports.getImageUrl = async (event) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.getImageUrlService(fileName);
        return responseHandler.success("Successfully retrieved image public Url",
            results.split("?")[0])
    }
    catch (error) {
        return responseHandler.error("Couldnot retrieve image public Url",
            error)
    }
};

// Change image permissions
module.exports.changePermissions = async (event) => {
    let reqData = JSON.parse(event.body);
    try {
        let results = await services.changePermissionsService(reqData);
        return responseHandler.success("Successfully changed image permission",
            null)
    }
    catch (error) {
        return responseHandler.error("Couldnot change image permissions",
            error)
    }
};


