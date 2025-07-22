import sql from '../db/neon.client.db.js';

// This script creates the 'products' table if it doesn't already exist.
// Run this with `node scripts/create-products-table.js`
// It defines the schema for storing product information in the database.

(async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("✅ 'products' table created successfully (if it didn't already exist).");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating 'products' table:", err);
    process.exit(1);
  }
})();
