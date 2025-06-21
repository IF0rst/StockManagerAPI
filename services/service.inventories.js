import db from "../db.js";
import { v4 as uuidv4 } from "uuid";

export function createInventory(name, owner_id) {
  const inventory_id = uuidv4();
  const stmt = db.prepare(`
    INSERT INTO inventory (inventory_id, name, owner_id)
    VALUES (?, ?, ?)
  `);
  stmt.run(inventory_id, name, owner_id);
  return { inventory_id, name, owner_id };
}

export function checkInventoryOwner(inventory_id, user_id) {
  const result = db.prepare(`
    SELECT 1 FROM inventory WHERE inventory_id = ? AND owner_id = ?
  `).get(inventory_id, user_id);

  return !!result;
}

export function addStorageToInventory(inventory_id, user_id) {
  const owns = checkInventoryOwner(inventory_id, user_id);
  if (!owns) throw new Error("Inventory not found");

  const storage_id = uuidv4();
  db.prepare(`
    INSERT INTO storage (storage_id, inventory_id)
    VALUES (?, ?)
  `).run(storage_id, inventory_id);

  return { storage_id, inventory_id };
}

export function getInventoryWithStorages(inventory_id, user_id) {
  const owns = checkInventoryOwner(inventory_id, user_id);
  if (!owns) throw new Error("Inventory not found");

  const inventory = db.prepare(`
    SELECT * FROM inventory WHERE inventory_id = ?
  `).get(inventory_id);

  const storages = db.prepare(`
    SELECT * FROM storage WHERE inventory_id = ?
  `).all(inventory_id);

  return { ...inventory, storages };
}

export function getAllInventoriesByUser(owner_id) {
  const stmt = db.prepare(`
    SELECT * FROM inventory WHERE owner_id = ?
  `);
  return stmt.all(owner_id);
}
