import { data } from "autoprefixer";
import axios from "axios";
const baseURL = "https://facerecengage.cognitiveservices.azure.com/";
const subscriptionKey = "11b98d4f78d8451891796b422bcd3d1a";
const faceAttributes = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
const detectionModel = "detection_01"; //*

export const faceApiForUrl = axios.create({
baseURL: baseURL,
timeout: 50000,
headers: {
"Ocp-Apim-Subscription-Key": subscriptionKey,
"Content-Type": "application/json"
},
params: {
returnFaceId: true,
returnFaceLandmarks: false,
returnFaceAttributes: faceAttributes,
detectionModel: detectionModel
}
});

export const faceApiForUpload = axios.create({
    baseURL: baseURL,
    timeout: 50000,
    data : data,
    headers: {
    "Ocp-Apim-Subscription-Key": subscriptionKey,
    "Content-Type": "application/octet-stream",
    'processData':false,
    },
    params: {
    returnFaceId: true,
    returnFaceLandmarks: false,
    returnFaceAttributes: faceAttributes,
    detectionModel: detectionModel,
    }
    });