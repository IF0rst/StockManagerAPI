import {createStorage} from "../services/service.storage.js";

export const createStorageRequest = (req,res) => {
  const { name, inventory_id } = req.body;
  const { user_id } = req.user;

  if (!name || !inventory_id) {
    return res.status(400).json({ error: "Missing name or inventory_id" });
  }

  try {
    const result = createStorage(name,inventory_id)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create storage", details: err.message });
  }
}