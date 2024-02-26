// //this file is of no use
// ((minioUploader)=>{
//     const Promise = require('bluebird');
//     const fs = require('fs');
//     const minioHelper = require('./minio_helper');
//     const { v4: uuidv4 } = require('uuid');
//     const httpStatus = require('http-status');

//     let minioClient = minioHelper.init();

//     minioUploader.checkMimeType = (significantBit, fileExtension)=>{
//       let detectedMimeType;
//       console.log('ext: ', fileExtension)
//       switch(significantBit){
//           case "89504e47":
//               detectedMimeType = 'image/png';
//               break;
//           case "ffd8ffe0":
//           case "ffd8ffe1":
//           case "ffd8ffe2":
//           case "ffd8ffe3":
//           case "ffd8ffe8":
//               detectedMimeType = fileExtension =='image/jpeg'?'image/jpeg':'image/jpg';
//               break;
//           default:
//               detectedMimeType = 'uknown';
//               break;
//       }
//       if(detectedMimeType == fileExtension){
//           return {invalid: false}
//       }
//       if(detectedMimeType != fileExtension){
//           return {invalid: true, message:'Only jpeg/jpg and png formats are allowed.'}
//       }
//     }

//       minioUploader.uploadImage = async(files, uploadBucket)=>{
//       let response = {status: httpStatus.INTERNAL_SERVER_ERROR, message: `Image upload failed.`}
//       let file = files.file;
//       return new Promise((resolve, reject)=>{
//         let fileStream = fs.readFileSync(file.filepath);
//         let base64 = fileStream.toString('hex');
//         let fileExtension = ([...file.originalFilename.split('.')].pop()).toLowerCase();
//         let mimeType = `image/${fileExtension}`;
//         let fileName = `${uuidv4()}.${fileExtension}`

//         let significantBit = base64.slice(0,8)
//         let checkedMimeType = minioUploader.checkMimeType(significantBit, mimeType)

//         if(checkedMimeType && checkedMimeType.invalid){
//           response.status = httpStatus.BAD_REQUEST;
//           response.message = 'Only jpeg/jpg and png formats are allowed.';
//           resolve(response);
//         }

//         let metaData = {
//           'Content-Type': mimeType
//         }

//         fs.stat(file.filepath, function(statError, stats){
//             if(statError){
//               resolve(response);
//             }

//             minioClient.putObject(uploadBucket, fileName, fileStream, stats.size, metaData, function(uploadingError, etag){
//               if(uploadingError){
//                 resolve(response);
//               }

//               data = {
//                 url:`${process.env.MINIO_BASE_URL}${uploadBucket}/${fileName}`,
//                 info: {...etag, fileName}
//               }
//               response = {status:200, data}
//               resolve(response);
//             } )
//         })
//       })
//     }

//       minioUploader.ackImage = (sourceBucket, destinationBucket, filename)=>{
//         return new Promise((resolve, reject)=>{
//           minioClient.copyObject(destinationBucket, filename, `${sourceBucket}/${filename}`, function(copyError, data){
//               if(copyError){
//                   return resolve(copyError)
//               }
//               resolve(data)
//           })
//         })
//     }
//   })(module.exports);
