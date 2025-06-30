import express from "express";
import {
    createProduct,
    deleteProduct, getProductsByStorage,
    moveProduct,
} from "../controller/controller.product.js";

const router = express.Router();

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/move", moveProduct);
router.get("/by-storage/:storage_id", getProductsByStorage);

export default router;
