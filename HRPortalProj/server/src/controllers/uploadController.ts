import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs";
import S3 from "aws-sdk/clients/s3";
const router = express.Router();
require("dotenv").config();

//const S3 = require("aws-sdk/clients/s3");
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function upload(file: any) {
  console.log("file", file)
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName as string,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

export const createFile = asyncHandler(async (req, res) => {
  const image = req.file;
  const result = await upload(image);
  res.status(201).json({ location: result.Location }); // get aws url
});
export const getFile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getfile" });
});
