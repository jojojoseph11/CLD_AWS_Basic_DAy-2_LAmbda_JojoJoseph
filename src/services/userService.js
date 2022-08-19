const awsService = require("./awsService");
const BUCKET_NAME = 'fact-image-manager';
const request = require('request')

const fetchImage = async (url) => {
    return new Promise((resolve, reject) => {
        request({ url, encoding: null }, (err, resp, buffer) => {
            if (err) {
                resolve(null);
            }
            resolve(buffer);
        });
    })
}

module.exports.uploadImageService = async (reqData) => {
    try {
        let fileContent = await fetchImage(reqData);
        let fileName = reqData.replace(/^.*[\\\/]/, '');
        const params = {
            Bucket: BUCKET_NAME,
            Key: 'aws_imagelist/' + fileName,
            Body: fileContent
        };
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


module.exports.listImageService = async () => {
    const params = {
        Bucket: BUCKET_NAME,
        Prefix: 'aws_imagelist/'
    };
    try {
        let results = await awsService.listImageObject(params);
        return results;
    }
    catch (error) {
        throw (error);
    }
}

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