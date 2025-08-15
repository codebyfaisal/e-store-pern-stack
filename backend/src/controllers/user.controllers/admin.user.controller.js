import client from "../../config/supabaseClient.config.js";

const getUsers = async (req, res) => {
  try {
    const { user_id } = req.user;

    const result = await client.query(
      `
      SELECT 
        user_id,
        email,
        fname,
        lname,
        role,
        created_at
      FROM users
      WHERE user_id != $1`,
      [user_id]
    );

    if (result.rows?.length === 0 && result.rowCount === 0) {
      return res
        .status(200)
        .json({ success: true, result: [], message: "No users found" });
    }

    return res.status(200).json({ success: true, result: result.rows });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch users" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.query(
      `
      SELECT 
        user_id,
        email,
        fname,
        lname,
        role,
        created_at
      FROM users
      WHERE user_id = $1`,
      [id]
    );

    if (result.rows?.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch the user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, role } = req.body;

    const result = await client.query(
      `
      UPDATE users
      SET role = $1
      WHERE email = $2
      RETURNING user_id, email, role, created_at`,
      [role, email]
    );

    if (result.rows?.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to fetch the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.query(
      `
        DELETE FROM users
        WHERE user_id = $1 and role != 'admin'
        RETURNING user_id, email, role, created_at`,
      [id]
    );

    if (result.rows?.length === 0) {
      console.error("Failed to delete user", result);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, result: result.rows[0] });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete the user" });
  }
};

const getActivities = async (req, res) => {
  try {
    const result = await client.query(`
      SELECT * FROM notifications_log
      LIMIT 5;
    `);

    return res.status(200).json({
      success: true,
      result: [
        [...result.rows],
        {
          notifications: result.rows.length,
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getUsers, getUser, updateUser, deleteUser, getActivities };
