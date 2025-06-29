import { v4 as uuidv4 } from "uuid";
import db from "../db.js";

const inventoryExists = (inventory_id) => {
  const result = db.prepare(`
    SELECT 1 FROM inventory WHERE inventory_id = ?
  `).get(inventory_id);
  return !!result;
};

export const createStorage = (name, inventory_id) => {
  if (!inventoryExists(inventory_id)) {
    return { success: false, error: "Inventory not found" };
  }

  const storage_id = uuidv4();

  try {
    db.prepare(`
      INSERT INTO storage (storage_id, inventory_id, name)
      VALUES (?, ?, ?)
    `).run(storage_id, inventory_id, name);

    return { success: true, storage_id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
