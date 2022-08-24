const awsService = require("./awsService");
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const UploadBucket = process.env.UploadBucket;
const URL_EXPIRATION_SECONDS = 300

module.exports.uploadImageService = async (reqData) => {
    try {
        const fileName = profile.jpg
        let uploadPath = __dirname + '/../../uploads/' + file.name;
        let reader = fs.createReadStream(uploadPath);
        const params = {
            Bucket: BUCKET_NAME,
            Body: reader,
            Key: file.name
        }
        let results = await awsService.addImageObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
};

module.exports.getImageService = async (fileName) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
    };
    try {
        let results = await awsService.getImageObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
};


module.exports.listImageService = async (limit) => {
    console.log(`Factweavers limit ${limit}`);
    const params = {
        Bucket: BUCKET_NAME,
        MaxKeys: limit
    };
    try {
        let results = await awsService.listImageObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
}

//deleting Images Services
module.exports.deleteImageService = async (fileName) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
    };
    try {
        let results = await awsService.deleteImageObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
};


//get Image Url services
module.exports.getImageUrlService = async (fileName) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
    };
    try {
        let results = await awsService.getImageUrlObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
};


module.exports.changePermissionsService = async (reqData) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: reqData.filename,
        ACL: reqData.permissions
    };
    try {
        let results = await awsService.changeImagePermissions(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
};


module.exports.getUploadS3ImageURL = async (fileName) => {
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `${randomID}.jpg`
    const params = {
        Bucket: BUCKET_NAME,
        Key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };
    try {
        let results = await awsService.getSignedUrlPromise(params);
        return ({ "uploadURl": results, "Key": params.Key });
    }
    catch (error) {
        throw (error);
    }
};