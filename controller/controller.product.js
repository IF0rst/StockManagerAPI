import {
    createProductService,
    deleteProductService, getProductsByStorageService,
    moveProductService
} from "../services/service.product.js";

export const createProduct = (req, res) => {
  const { name, serial_number, storage_id } = req.body;

  if (!name || !serial_number || !storage_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const product = createProductService(name, serial_number, storage_id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = (req, res) => {
  const { id } = req.params;

  try {
    deleteProductService(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const moveProduct = (req, res) => {
  const { id } = req.params;
  const { new_storage_id } = req.body;

  if (!new_storage_id) {
    return res.status(400).json({ error: "Missing new_storage_id" });
  }

  try {
    moveProductService(id, new_storage_id);
    res.status(200).json({ message: "Product moved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByStorage = (req, res) => {
  const { storage_id } = req.params;

  try {
    const products = getProductsByStorageService(storage_id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
