import Database from "better-sqlite3"
const database = new Database("./db.sql");

export const initTables = () => {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS user (
      user_id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL
    )
  `;

  const createStoreTable = `
    CREATE TABLE IF NOT EXISTS store (
      store_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      owner_id TEXT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES user(user_id)
    )
  `;

  const createShopProductsTable = `
    CREATE TABLE IF NOT EXISTS shop_product (
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      amount INTEGER NOT NULL DEFAULT 0
    )
  `;

  const createInventoryTable = `
    CREATE TABLE IF NOT EXISTS inventory (
      inventory_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES user(user_id)
    )
  `;

  const createStorageTable = `
    CREATE TABLE IF NOT EXISTS storage (
      storage_id TEXT PRIMARY KEY,
      inventory_id TEXT NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id)
    )
  `;

  const createProductTable = `
    CREATE TABLE IF NOT EXISTS product (
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      storage_id TEXT NOT NULL,
      serial_number TEXT UNIQUE,
      creation_date TEXT NOT NULL,
      FOREIGN KEY (storage_id) REFERENCES storage(storage_id)
    )
  `;

  const createNotificationTable = `
    CREATE TABLE IF NOT EXISTS notification (
      notification_id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (user_id) REFERENCES user(user_id)
    )
  `;

  database.prepare(createUserTable).run();
  database.prepare(createStoreTable).run();
  database.prepare(createShopProductsTable).run();
  database.prepare(createInventoryTable).run();
  database.prepare(createStorageTable).run();
  database.prepare(createProductTable).run();
  database.prepare(createNotificationTable).run();
};

export default database;
