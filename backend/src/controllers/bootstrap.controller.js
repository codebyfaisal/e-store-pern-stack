import client from "../config/supabaseClient.config.js";
import roles from "../roles/users.roles.js";

const getBootstrapData = async (req, res) => {
  try {
    const result = await client.query(
      `SELECT * FROM notifications_log LIMIT 5;`
    );

    return res.status(200).json({
      success: true,
      result: {
        notifications: [...result.rows],
        role: roles[req.user.role],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getBootstrapData };
