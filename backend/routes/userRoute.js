const express = require("express");
const {registerUser, loginUser, logout, forgetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
const cors = require("cors")

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfile)
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)


module.exports = router