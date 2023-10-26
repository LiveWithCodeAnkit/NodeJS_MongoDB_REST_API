const express = require("express");

const router = express.Router();

// users
const {
  registerUser,
  getUser,
  getProfile,
  removeProfile,
  updateProfile,
} = require("../../controllers/ecommerce/users.controller");

//category

const {
  addCategory,
  getCategory,
  removeCategory,
  updateCategory,
} = require("../../controllers/ecommerce/category.controller");

//product
const {
  addProduct,
  getProducts,
  getProductInfo,
  updateProduct,
  removeProduct,
} = require("../../controllers/ecommerce/product.controller");

// All routes

//add user
router.post("/register", registerUser);
router.get("/users", getUser);
router.get("/profile-info/:id", getProfile);
router.put("/modify-user/:_id", updateProfile);
router.delete("/remove-profile/:_id", removeProfile);

//add category

router.post("/add-category", addCategory);
router.get("/all-categories", getCategory);
router.put("/modify-category/:_id", updateCategory);
router.delete("/remove-category/:_id", removeCategory);

//add product

router.post("/add-product", addProduct);
router.get("/all-product", getProducts);
router.get("/product-info/:_id", getProductInfo);
router.put("/modify-product/:_id", updateProduct);
router.delete("/remove-product/:_id", removeProduct);
module.exports = router;
