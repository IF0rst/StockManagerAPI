import express from "express";
import { authJWT } from "../middlewares/middleware.auth.js";
import {createStorageRequest} from "../controller/controller.storage.js";

const storageRouter = express.Router();

storageRouter.post("/", authJWT, createStorageRequest);

export default storageRouter;
