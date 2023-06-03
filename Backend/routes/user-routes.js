const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

// USER ROUTES

// Get all users
router.get("/", userController.GetUsers);

// Get a single user by ID
router.get("/:id", userController.GetUserByID);

// Create a new user
router.post("/", userController.CreateUser);

// Update a user by ID
router.put("/:id", userController.UpdateUser);

// Delete a user by ID
router.delete("/:id", userController.DeleteUser);

// User Authentication
router.post(
  "/auth",
  userController.AuthenticateUser,
  userController.Authenticated
);

router.post("/register", userController.RegisterUser);

// // GOOGLE AUTHENTICATION
// router.get("/auth/google", userController.GoogleAuthenticate);
// router.get(
//   "/auth/google/dashboard",
//   userController.GoogleAuthenticateRedirect,
//   userController.GoogleAuthenticateCallback
// );

// router.get("/logout", userController.LogoutUser);

module.exports = router;
