"use strict";

(minioHelper => {
const Minio = require("minio");
const Promise = require("bluebird");
const axios = require("axios").default;
const fs = require("fs");
const {v4: uuidv4} = require("uuid");

const httpStatus = require("http-status");
let minioClient;
minioHelper.getInstance = () => {
    return minioClient;
};
// Instantiate the minio client with the endpoint
minioHelper.init = () => {
    minioClient = new Minio.Client({
        endPoint: process.env.MINIO_HOST,
        port: parseInt(process.env.MINIO_PORT),
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY,
        useSSL: false,
    });
    console.log("Connected to Minio...", {
        endPoint: process.env.MINIO_HOST,
        port: parseInt(process.env.MINIO_PORT),
    });
    return minioClient;
};

minioHelper.objectStatus = (bucket, objectName) => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.statObject(bucket, objectName, function (err, stat) {
                if (err) {
                    resolve(err);
                    return;
                }
                resolve(stat);
            });
        } catch (error) {
            return reject(error);
        }
    });
};

// check bucket in minio
minioHelper.bucketExists = bucketName => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.bucketExists(bucketName, (err, exists) => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: err,
                    });
                } else if (!exists) {
                    minioClient.makeBucket(bucketName, err => {
                        if (err) {
                            return resolve({
                                status: 400,
                                message: "Error on Bucket Creating",
                            });
                        }
                        return resolve({
                            status: 200,
                            message: "Bucket Created",
                        });
                    });
                } else {
                    return resolve({
                        status: 200,
                        message: "Bucket Available",
                    });
                }
            });
        } catch (error) {
            return reject(error);
        }
    });
};
// make bucket in minio
minioHelper.makeBucket = bucketName => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.makeBucket(bucketName, err => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Bucket Creating",
                    });
                }
                return resolve({
                    status: 200,
                    message: "Bucket Created",
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};
// remove bucket from minio
minioHelper.removeBucket = bucketName => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.removeBucket(bucketName, err => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Bucket Removing",
                    });
                }
                return resolve({
                    status: 200,
                    message: "Bucket Removed",
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};
// put object in minio
minioHelper.putObject = (bucketName, logogbime, file, metaData) => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.putObject(bucketName, logogbime, file, metaData, err => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Object Store",
                    });
                }
                return resolve({
                    status: 200,
                    message: "Object Stored Successfully",
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};
// remove object from minio
minioHelper.removeObject = (bucketName, object) => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.removeObject(bucketName, object, err => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Object Removing",
                    });
                }
                return resolve({
                    status: 200,
                    message: "Object Removed Successfully",
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};
// list of objects in a bucket
minioHelper.listObjects = (bucketName, prefix) => {
    return new Promise((resolve, reject) => {
        try {
            let data = [];
            let stream = minioClient.listObjects(bucketName, prefix);
            stream.on("data", function (obj) {
                data.push(obj);
            });
            stream.on("end", function () {
                if (data.length >= 1) {
                    // if (data[0].name == process.env.LOGO && data[1].name == process.env.WATERMARK) {
                    return resolve({
                        status: 200,
                        message: "objects found",
                        data: data,
                    });
                    // }
                }
                return resolve({
                    status: 400,
                    message: "object not found",
                });
            });
            stream.on("error", function (err) {
                return resolve({
                    status: 200,
                    message: err,
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};

minioHelper.fetchImage = async url => {
    const image = await axios.get(url, {
        responseType: "arraybuffer",
    });
    return image.data;
};

// put metadata of object in minio
minioHelper.fPutObject = (bucketName, object) => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.fPutObject(bucketName, object, err => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Object Fetching",
                    });
                }
                return resolve({
                    status: 200,
                    message: "Object Fetched Successfully",
                });
            });
        } catch (error) {
            return reject(error);
        }
    });
};

minioHelper.presignedGetObject = (bucketName, object, expires) => {
    return new Promise((resolve, reject) => {
        try {
            minioClient.presignedGetObject(bucketName, object, expires, (err, presignedUrl) => {
                if (err) {
                    return resolve({
                        status: 400,
                        message: "Error on Object Fetching",
                    });
                }
                // console.log(presignedUrl)
                return resolve(presignedUrl);
            });
        } catch (error) {
            return reject(error);
        }
    });
};

minioHelper.detectMimeType = base64file => {
    // console.log(base64file)
    let signatures = {
        "/9j/": "image/jpeg",
        iVBORw0KGgo: "image/png",
    };

    for (let signature in signatures) {
        if (base64file.indexOf(signature) == 0) {
            return signatures[signature];
        }
    }
};

minioHelper.getPresignedUrl = async (bucket, object) => {
    let objectStatus = await minioHelper.objectStatus(bucket, object);

    if (objectStatus.code) {
        return {error: objectStatus.code};
    }
    return new Promise((resolve, reject) => {
        let urlExpiresIn = parseInt(process.env.PRESIGNED_URL_EXPIRES_IN);

        try {
            minioClient.presignedUrl("GET", bucket, object, urlExpiresIn, function (err, presignedUrl) {
                if (err) {
                    resolve(err);
                    return;
                }
                resolve(presignedUrl);
            });
        } catch (err) {
            return reject(err);
        }
    });
};

minioHelper.checkMimeType = (significantBit, fileExtension) => {
    let detectedMimeType;
    console.log("ext: ", fileExtension);
    switch (significantBit) {
        case "89504e47":
            detectedMimeType = "image/png";
            break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            detectedMimeType = fileExtension == "image/jpeg" ? "image/jpeg" : "image/jpg";
            break;
        default:
            detectedMimeType = "uknown";
            break;
    }
    if (detectedMimeType == fileExtension) {
        return {invalid: false};
    }
    if (detectedMimeType != fileExtension) {
        return {invalid: true, message: "Only jpeg/jpg and png formats are allowed."};
    }
};

minioHelper.uploadImage = async (uploadBucket, file) => {
    let response = {status: httpStatus.INTERNAL_SERVER_ERROR, message: `Image upload failed.`};
    return new Promise((resolve, reject) => {
        let fileStream = fs.readFileSync(file.path);
        let base64 = fileStream.toString("hex");
        let fileExtension = file.originalname.split(".")[1].toLowerCase();
        let mimeType = `image/${fileExtension}`;
        let fileName = `${uploadBucket}-${file.newName}.${fileExtension}`;

        let significantBit = base64.slice(0, 8);
        let checkedMimeType = minioHelper.checkMimeType(significantBit, mimeType);

        if (checkedMimeType && checkedMimeType.invalid) {
            response.status = httpStatus.BAD_REQUEST;
            response.message = "Only jpeg/jpg and png formats are allowed.";
            resolve(response);
        }

        let metaData = {
            "Content-Type": mimeType,
        };

        fs.stat(file.path, function (statError, stats) {
            if (statError) {
                resolve(response);
            }

            minioClient.putObject(
                uploadBucket,
                fileName,
                fileStream,
                stats.size,
                metaData,
                function (uploadingError, etag) {
                    if (uploadingError) {
                        resolve(response);
                    }

                    let data = {
                        url: `${process.env.MINIO_HOST}/${uploadBucket}/${fileName}`,
                        info: {...etag, fileName},
                    };
                    response = {status: 200, data};
                    resolve(response);
                }
            );
        });
    });
};

minioHelper.uploadAndGetPublicLink = async (uploadBucket, file) => {
    let response = {status: httpStatus.INTERNAL_SERVER_ERROR, message: `Image upload failed.`};
    return new Promise((resolve, reject) => {
        let fileStream = fs.readFileSync(file.path);
        let base64 = fileStream.toString("hex");
        let fileExtension = file.originalname.split(".")[1].toLowerCase();
        let mimeType = `image/${fileExtension}`;
        let fileName = `${uploadBucket}-${file.newName}.${fileExtension}`;

        let significantBit = base64.slice(0, 8);
        let checkedMimeType = minioHelper.checkMimeType(significantBit, mimeType);

        if (checkedMimeType && checkedMimeType.invalid) {
            response.status = httpStatus.BAD_REQUEST;
            response.message = "Only jpeg/jpg and png formats are allowed.";
            resolve(response);
        }

        let metaData = {
            "Content-Type": mimeType,
        };

        fs.stat(file.path, function (statError, stats) {
            if (statError) {
                resolve(response);
            }

            minioClient.putObject(
                uploadBucket,
                fileName,
                fileStream,
                stats.size,
                metaData,
                function (uploadingError, etag) {
                    if (uploadingError) {
                        resolve(response);
                    }

                    // Generate public link
                    minioClient.presignedUrl('GET', uploadBucket, fileName, 24 * 60 * 60, function(presignedUrlErr, presignedUrl) {
                        if (presignedUrlErr) {
                            resolve(response);
                        }

                        let data = {
                            url: presignedUrl,
                            info: {...etag, fileName},
                        };
                        response = {status: 200, data};
                        resolve(response);
                    });
                }
            );
        });
    });
};


minioHelper.uploadToSpecificBucket = async (bucketName, file) => {
    let response = {status: httpStatus.INTERNAL_SERVER_ERROR, message: `File upload failed.`};
    return new Promise((resolve, reject) => {
        let fileStream = fs.readFileSync(file.path);
        let fileExtension = file.originalname.split(".")[1].toLowerCase();
        let mimeType = `image/${fileExtension}`;
        let fileName = `${uuidv4()}.${fileExtension}`; // Generating a unique filename

        let metaData = {
            "Content-Type": mimeType,
        };

        fs.stat(file.path, function (statError, stats) {
            if (statError) {
                resolve(response);
            }

            minioClient.putObject(
                bucketName,
                fileName,
                fileStream,
                stats.size,
                metaData,
                function (uploadingError, etag) {
                    if (uploadingError) {
                        resolve(response);
                    }

                    let data = {
                        url: `${process.env.MINIO_HOST}/${bucketName}/${fileName}`,
                        info: {...etag, fileName},
                    };
                    response = {status: 200, data};
                    resolve(response);
                }
            );
        });
    });
};


})(module.exports);

// hint for image upload in minio
// const file = fs.readFileSync('/home/manoj/bfi-tech/backend/common/mcs-common-service-node/server/assets/Global_IME_logo.png')
//   let metaData = {
//        'Content-Type': 'image/png',
//      }
//   minioHelper.putObject('globalstore', 'gbme.png', file, metaData ).then(message => console.log(message));
