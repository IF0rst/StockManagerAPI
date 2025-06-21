import express from "express";
import * as InventoryController from "../controller/controller.inventories.js";
import { authJWT } from "../middlewares/middleware.auth.js";

const router = express.Router();

router.post("/", authJWT, InventoryController.createInventory);
router.get("/", authJWT, InventoryController.getAllInventories);
router.get("/:id", authJWT, InventoryController.getInventory);

export default router;
