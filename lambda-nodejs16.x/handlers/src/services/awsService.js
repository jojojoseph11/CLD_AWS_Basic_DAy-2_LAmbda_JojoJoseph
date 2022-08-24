const AWS = require('aws-sdk');
const ID = process.env.AWS_S3_ACCESS_KEY_ID;
const SECRET = process.env.AWS_S3_SECRET_ACCESS_KEY;
const REGION = process.env.REGION;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: REGION
});


module.exports.
    addImageObject = async (imageData) => {
        return await s3.upload(imageData).promise();
    };

module.exports.getImageObject = async (imageName) => {
    return await s3.getObject(imageName).promise();
};

module.exports.listImageObject = async (paramsData) => {
    return await s3.listObjectsV2(paramsData).promise();
};

module.exports.deleteImageObject = async (paramsData) => {
    return await s3.deleteObject(paramsData).promise();
};

module.exports.getImageUrlObject = async (paramsData) => {
    return await s3.getSignedUrlPromise('getObject', paramsData);
};

module.exports.changeImagePermissions = async (paramsData) => {
    return await s3.putObjectAcl(paramsData).promise();
};

module.exports.getSignedUrlPromise = async (paramsData) => {
    return await s3.getSignedUrl('putObject', paramsData);
};