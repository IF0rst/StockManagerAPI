import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createProductService = (name, serial_number, storage_id) => {
  const product_id = uuidv4();
  const creation_date = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO product (product_id, name, serial_number, creation_date, storage_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(product_id, name, serial_number, creation_date, storage_id);

  return { product_id, name, serial_number, creation_date, storage_id };
};

export const deleteProductService = (product_id) => {
  const stmt = db.prepare(`DELETE FROM product WHERE product_id = ?`);
  const result = stmt.run(product_id);

  if (result.changes === 0) {
    throw new Error("Product not found");
  }
};

export const moveProductService = (product_id, new_storage_id) => {
  const stmt = db.prepare(`
    UPDATE product SET storage_id = ? WHERE product_id = ?
  `);

  const result = stmt.run(new_storage_id, product_id);

  if (result.changes === 0) {
    throw new Error("Product not found or already in this storage");
  }
};

export const getProductsByStorageService = (storage_id) => {
  const stmt = db.prepare(`
    SELECT product_id, name, serial_number, creation_date
    FROM product
    WHERE storage_id = ?
  `);

  return stmt.all(storage_id);
};
