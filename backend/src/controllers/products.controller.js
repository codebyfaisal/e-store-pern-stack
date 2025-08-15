import client from "../config/supabaseClient.config.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await client.query(`
        SELECT
          p.product_id,
          p.name AS product_name,
          p.description,
          p.price,
          p.stock_quantity,
          c.name AS category,
          b.name AS brand,
          p.created_at,
          p.updated_at
        FROM products p
        JOIN brands b ON p.brand_id = b.brand_id
        JOIN categories c ON p.category_id = c.category_id
        ORDER BY product_id DESC;`);

    if (result.rows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    console.log("Products fetched successfully:", result.rows);
    res.status(200).json({ success: true, result: result.rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(`
      SELECT * FROM products
      WHERE product_id = ${id}
      `);
    if (!result || result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }
    console.log("Product fetched successfully:", result.rows[0]);
    res.status(200).json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch the product" });
  }
};

// Insert/Create a new product
const insertProduct = async (req, res) => {
  console.log("Inserting new product:", req.body);
  try {
    const { name, price, category_id, brand_id, stock_quantity, description } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !price ||
      !category_id ||
      !brand_id ||
      !stock_quantity ||
      !description
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // Use parameterized query to prevent SQL injection
    const insertQuery = `
      INSERT INTO products (name, price, category_id, brand_id, stock_quantity, description)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING product_id;
    `;

    const values = [
      name,
      price,
      category_id,
      brand_id,
      stock_quantity,
      description,
    ];

    const result = await client.query(insertQuery, values);

    const productId = result.rows[0]?.product_id;

    if (!productId) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to retrieve new product ID" });
    }

    console.log("Product inserted with ID:", productId);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId,
    });
  } catch (error) {
    console.error("Error inserting product:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create new product" });
  }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const { product_id: productId, name, price, image } = req.body;

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });

    // Construct the full query
    const result = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, image = ${image}, updated_at = CURRENT_TIMESTAMP
      WHERE product_id = ${productId}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Return the updated product details
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: result[0],
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to update the product",
    });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const value = [id];
    const query = `
      DELETE FROM products
      WHERE product_id = $1
      RETURNING *
    `;

    const result = await client.query(query, value);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Product Deleted successfully:", result);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error Deleting product:", error);
    if (error.code === "23503") {
      return res.status(400).json({
        success: false,
        error: "Product cannot be deleted as it is linked to existing orders.",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Failed to delete the product",
    });
  }
};

// Get products meta result
const getProductMeta = async (req, res) => {
  console.log(12);

  try {
    const result = await client.query(`
      SELECT brand_id, name FROM brands;
      SELECT category_id, name FROM categories;
    `);

    const brands = result[0].rows;
    const categories = result[1].rows;

    console.log("Brands fetched successfully:", brands);
    console.log("Categories fetched successfully:", categories);

    if (brands.length === 0 || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Meta data found" });
    }

    res.status(200).json({ success: true, result: { brands, categories } });
  } catch (error) {
    console.error("Error fetching meta data:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch Meta data`" });
  }
};

export {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductMeta,
};
