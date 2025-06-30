import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.router.js";
import { initTables } from "./db.js";
import inventoriesRouter from "./router/inventories.router.js";
import storageRouter from "./router/storage.router.js";
import productRouter from "./router/product.router.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

initTables();

app.use("/auth", authRouter);
app.use("/inventory", inventoriesRouter);
app.use("/storage", storageRouter);
app.use("/products", productRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
