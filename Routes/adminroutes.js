const express = require("express");
const router = express.Router();
const {
  addProduct,
  getallProducts,
  getallusers,
  deleteuser,
  adduser,
  deleteProduct,
  edituser,
  editproduct,
  getProductbyid,
  getUserbyid,
  getadminbyid,
  editadminProfile,
  sortproduct,
  sortusers,
  filterusers,
  filterProdducts,
  filteredUsers,
} = require("../Controllers/adminController");
const { isAdmin } = require("../Middleware/adminsUSer_validitor");
const upload = require("../Middleware/upload");
const multer = require("multer");
const path = require("path");

router.get("/profile/:id", getadminbyid);
//2 edit profile
router.patch("/editprofile/:id", upload.single("Image"), editadminProfile);
// features Profuct (accessible to admins)

//1) get all products
router.get("/products", getallProducts); ////comment is admin after i check it )
//2) get product by id
router.get("/getproductbyid/:id", getProductbyid);
//3) add product
router.post("/createproduct", upload.single("Image"), addProduct);
//4) update product
router.patch("/updataproduct/:id", upload.single("Image"), editproduct);
// 5) delete product
router.delete("/deleteProducts/:id", deleteProduct);
//6) sort product
router.get("/sortproduct/:id", sortproduct);
//7 sort users
router.get("/sortusers/:id", sortusers);
//8 filter Products
router.get("/filterProducts/:id", filterProdducts);
//9) filter users
router.get("/filterUsrs/:id", filteredUsers);

//// features admin do with user here
//1 get all users
router.get("/users", getallusers); ////comment is admin after i check it
//2) get user by id
router.get(`/getuserbyid/:id`, getUserbyid);
//3) add user
router.post("/createuser", upload.single("Image"), adduser); ////comment is admin after i check it

//4) update user
router.patch("/updateuser/:id", upload.single("Image"), edituser);
//5) delete user
router.delete("/deleteuser/:id", deleteuser); ////comment is admin after i check it
//5) sort user

module.exports = router;
