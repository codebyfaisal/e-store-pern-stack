import client from "../config/supabaseClient.config.js";

// Get all Brands
const getBrands = async (req, res) => {
  try {
    const result = await client.query(`
        SELECT 
            b.brand_id,
            b.name AS brand_name,
            CASE 
                WHEN COUNT(DISTINCT p.category_id) = 0 THEN '-' 
                ELSE COUNT(DISTINCT p.category_id)::text 
            END AS total_categories,
            COALESCE(ROUND(AVG(p.price), 2), 0.00) AS avg_price,
            COALESCE(SUM(p.stock_quantity), 0) AS total_stock
        FROM 
            products p
        RIGHT JOIN 
            brands b ON p.brand_id = b.brand_id
        GROUP BY 
            b.brand_id, b.name
        ORDER BY 
            total_categories DESC NULLS LAST;
        `);

    if (result.rows?.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Brands found" });
    }
    console.log("Brands fetched successfully:", result.rows);
    res.status(200).json({ success: true, result: result.rows });
  } catch (error) {
    console.error("Error fetching Brands:", error);
    res.status(500).json({ success: false, error: "Failed to fetch Brands" });
  }
};

// Insert/Create a new Brand
const insertBrand = async (req, res) => {
  console.log("Inserting new Brand:", req.body);
  const { name: brand } = req.body;

  // Check if name is provided
  if (!brand) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }

  try {
    // Insert the new Brand
    const result = await client.query(
      `
      INSERT INTO Brands (name) 
      VALUES ($1) RETURNING *`,
      [brand]
    );

    if (result.rows?.length === 0) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to create new Brand" });
    }

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      brand: result.rows[0],
    });

    console.log("Brand inserted:", result);
  } catch (error) {
    // Handle duplicate error (23505: unique violation)
    if (error.code === "23505") {
      console.error("Error creating new Brand:", error);
      return res
        .status(500)
        .json({ success: false, error: "Brand already exists" });
    } else {
      console.error("Error creating new Brand:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to create new Brand" });
    }
  }
};

// Update an existing Brand by ID
const updateBrand = async (req, res) => {
  try {
    const { Brand_id: BrandId, name } = req.body;

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
    });

    // Construct the full query
    const result = await client.query(`
      UPDATE Brands
      SET name = ${name}, updated_at = CURRENT_TIMESTAMP
      WHERE Brand_id = ${BrandId}
      RETURNING *
    `);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    // Return the updated Brand details
    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      Brand: result[0],
    });
  } catch (error) {
    console.error("Error updating Brand:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update the Brand",
    });
  }
};

// Delete a Brand by ID
const deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brandQuery = await client.query(
      `SELECT b.name, b.brand_id, COUNT(p.product_id) AS product_count
       FROM brands b
       LEFT JOIN products p ON b.brand_id = p.brand_id
       WHERE b.brand_id = $1
       GROUP BY b.brand_id`,
      [id]
    );

    if (brandQuery.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Brand not found",
      });
    }

    const { name: brandName, product_count } = brandQuery.rows[0];

    if (parseInt(product_count) > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete brand "${brandName}", when it is linked to products`,
      });
    }

    await client.query(`
      DELETE FROM brands 
      WHERE brand_id = $1`, [id]);

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete the brand",
    });
  }
};

export { getBrands, insertBrand, updateBrand, deleteBrand };
