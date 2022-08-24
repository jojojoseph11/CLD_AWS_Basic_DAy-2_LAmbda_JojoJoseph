const services = require("./src/services/userService");
const fs = require("fs");
const responseHandler = require("./responseHandler");
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */


//Status
exports.lambdaHandler = async (event, context) => {

    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: `Factweavers service is up and running Bucket Name : ${AWS_BUCKET_NAME}`,
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};


//Upload Images 
exports.uploadImage = async (event, context) => {
    try {
        let results = await services.uploadImageService();
        return responseHandler.success("Successfully uploaded image", results);
    } catch (err) {
        return responseHandler.error("Could not upload the Image", err);
    }
};

//Get Images 
exports.getImage = async (event, context) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.getImageService(fileName);
        return responseHandler.success("Successfully fetched image", results);
    } catch (err) {
        return responseHandler.error("Could not reterive the Image", err);
    }
};

//List all images 
exports.listAllImage = async (event, context) => {
    let Limit = event.queryStringParameters.limit;
    try {
        let results = await services.listImageService(Limit);
        return responseHandler.success("Successfully fetched image", results);
    } catch (err) {
        return responseHandler.error("Could not reterive the Image", err);
    }
};

// Deteling the Image 
exports.deleteImage = async (event, context) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.deleteImageService(fileName);
        return responseHandler.success("Successfully Deteling image", results);
    } catch (err) {
        return responseHandler.error("Could not delete the Image", err);
    }
};

//Get Image url services
exports.getPublicUrlImage = async (event, context) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.getImageUrlService(fileName);
        return responseHandler.success("Successfully retrived the pubilc url", results.split("?")[0]);
    } catch (err) {
        return responseHandler.error("Could etrived the pubilc url", err);
    }
};

//Change the permissions 
exports.changePermissionsService = async (event, context) => {
    let reqData = JSON.parse(event.body);
    try {
        let results = await services.changePermissionsService(reqData);
        return responseHandler.success("Successfully changed permissions", null);
    }
    catch (err) {
        return responseHandler.error("Could not change the permissions", err);
    }
};


// getUploadS3ImageURL to cretae a url to upload that image  
exports.getUploadS3ImageURL = async (event, context) => {
    let fileName = event.queryStringParameters.filename;
    try {
        let results = await services.getUploadS3ImageURL(fileName);
        return responseHandler.success("Successfully get thge upload url", results);
    }
    catch (err) {
        return responseHandler.error("Could not get thge upload url", err);
    }
};