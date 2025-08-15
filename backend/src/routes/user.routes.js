import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
} from "../controllers/user.controllers/auth.user.controller.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getActivities
} from "../controllers/user.controllers/admin.user.controller.js";

import {
  getInvites,
  addInvite,
  updateInvite,
  deleteInvite,
} from "../controllers/user.controllers/invite.user.controller.js";

import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUserProfile,
} from "../controllers/user.controllers/profile.user.controller.js";

import {
  checkInvitation,
  authenticate,
  authorizeRole,
  verifyRefreshToken,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/activities", authenticate, getActivities)

// Auth routes
router.post("/users/register", checkInvitation, registerUser);
router.post("/users/login", loginUser);
router.get("/users/logout", authenticate, logoutUser);
router.get("/users/reset-token", verifyRefreshToken, refreshUserToken);

// User self-service
router.get("/users/profile", authenticate, getUserProfile);
router.put("/users/profile", authenticate, updateUserProfile);
router.put("/users/profile/password", authenticate, changeUserPassword);
router.delete("/users/profile", authenticate, deleteUserProfile);

// ADMIN
// Invites
router.get("/users/invites", authenticate, authorizeRole(["admin"]), getInvites);
router.post("/users/invites", authenticate, authorizeRole(["admin"]), addInvite);
router.put("/users/invites", authenticate, authorizeRole(["admin"]), updateInvite);
router.delete("/users/invites/:email", authenticate, authorizeRole(["admin"]), deleteInvite);

// User
router.get("/users", authenticate, authorizeRole(["admin"]), getUsers);
router.put("/users", authenticate, authorizeRole(["admin"]), updateUser);
router.get("/users/:id", authenticate, authorizeRole(["admin"]), getUser);
router.delete("/users/:id", authenticate, authorizeRole(["admin"]), deleteUser);

export default router;
