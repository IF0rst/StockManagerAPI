import * as InventoryService from "../services/service.inventories.js";

export function createInventory(req, res) {
  const { name } = req.body;
  const { user_id } = req.user;

  if (!name) {
    return res.status(400).json({ error: "Missing name" });
  }

  try {
    const result = InventoryService.createInventory(name, user_id);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create inventory", details: err.message });
  }
}

export function getInventory(req, res) {
  const { user_id } = req.user;
  const inventory_id = req.params.id;

  try {
    const result = InventoryService.getInventoryWithStorages(inventory_id, user_id);
    res.json(result);
  } catch (err) {
    if (err.message === "Inventory not found") {
      return res.status(404).json({ error: "Inventory not found" });
    }
    res.status(500).json({ error: "Failed to fetch inventory", details: err.message });
  }
}

export function getAllInventories(req, res) {
  const { user_id } = req.user;

  try {
    const inventories = InventoryService.getAllInventoriesByUser(user_id);
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventories", details: err.message });
  }
}
