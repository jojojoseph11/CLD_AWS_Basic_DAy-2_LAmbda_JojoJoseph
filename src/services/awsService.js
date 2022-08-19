const AWS = require('aws-sdk');
const ID = process.env.ACCESS_KEY;
const SECRET = process.env.SECRET_KEY;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


module.exports.addImageObject = async (imageData) => {
    return await s3.upload(imageData).promise();
};

module.exports.getImageObject = async (imageName) => {
    return await s3.getObject(imageName).promise();
};

module.exports.listImageObject = async (paramsData) => {
    return await s3.listObjects(paramsData).promise();
};

module.exports.deleteImageObject = async (paramsData) => {
    return await s3.deleteObject(paramsData).promise();
};

module.exports.getImageUrlObject = async (paramsData) => {
    return await s3.getSignedUrl('getObject', paramsData);
};

module.exports.changeImagePermissions = async (paramsData) => {
    return await s3.putObjectAcl(paramsData).promise();
};