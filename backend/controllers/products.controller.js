import sql from "../db/neon.client.db.js";
import randomIdGenerator from "../utils/random-id.util.js";

// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM products`;
    console.log(result);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    console.log("Products fetched successfully:", result);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

// Get a single product by ID
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql`
      SELECT * FROM products
      WHERE product_id = ${id}
      `;
    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }
    console.log("Product fetched successfully:", result[0]);
    res.status(200).json({ success: true, result: result[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch the product" });
  }
};

// Insert/Create a new product
const insertProduct = async (req, res) => {
  const { name, price, image } = req.body;

  // Check if all fields are provided
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  const MAX_ATTEMPTS = 4;
  let attempts = 0;
  let success = false;
  let productId;

  // Retry loop to regenerate a unique product ID
  while (attempts < MAX_ATTEMPTS && !success) {
    productId = "prod_" + randomIdGenerator(8); // Generate random 8-character ID

    try {
      // Insert the new product
      const result = await sql`
        INSERT INTO products (product_id, name, price, image)
        VALUES (${productId}, ${name}, ${price}, ${image});
      `;

      console.log("Product inserted:", result);
      success = true; // Mark success
    } catch (error) {
      attempts++;

      // Handle duplicate error (23505: unique violation)
      if (error.code === "23505") {
        console.warn(
          `⚠️ Duplicate product_id detected: ${productId}. Retrying... (Attempt ${attempts})`
        );
      } else {
        // Log unexpected errors
        console.error("Error creating new product:", error);
        break; // Stop the loop if the error is not a duplicate key
      }
    }
  }

  if (success) {
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      productId,
    });
  } else {
    return res
      .status(500)
      .json({ success: false, error: "Failed to create new product" });
  }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const { product_id: productId, name, price, image } = req.body;

    // Construct the full query
    const result = await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, image = ${image}, updated_at = CURRENT_TIMESTAMP
      WHERE product_id = ${productId}
      RETURNING *
    `;

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Return the updated product details
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: result[0],
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update the product",
    });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql`
      DELETE FROM products
      WHERE product_id = ${id}
      RETURNING *
    `;

    console.log("Delete result:", result);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    console.log("Product Deleted successfully:", result);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error Deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete the product",
    });
  }
};

export { getProducts, getProduct, insertProduct, updateProduct, deleteProduct };
