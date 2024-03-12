const { User, UpdateValidation } = require("../Utlis/user_schema_Validatiions");
////khikhikhkhjkhkhjkhkjh
const { Userschema } = require("../Utlis/user_schema_Validatiions");
const producrschema = require("../Utlis/productvalidation");
const { Users } = require("../Models/Users");
const Product = require("../Models/Products");
const bcrypt = require("bcryptjs");

let IDUSER = 1;
let IDPRODUCt = 1;
// Assuming you have a Users model imported here
exports.getadminbyid = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const admin = await Users.findById(userId);

    if (!admin || admin.role !== "admin") {
      return res
        .status(404)
        .json({ message: "User not found or not an admin" });
    }

    return res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
};
//////// edit admin profile

exports.editadminProfile = async (req, res, next) => {
  const iD = req.params.id;
  const editprofile = req.body;
  editprofile.Image = req.file.path;
  try {
    const validated = Userschema.validate(editprofile);

    if (validated.error) {
      throw validated.error;
    }
    const newedit = await Users.findByIdAndUpdate(iD, editprofile);
    console.log(editprofile.role);
    if (!editprofile || newedit.role !== "admin") {
      return res
        .status(404)
        .json({ message: "product not found or not admin" });
    }
    res.status(200).json({ message: "product updated succesful " });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
  next();
};

/// add product
exports.addProduct = async (req, res, next) => {
  try {
    // Extract product details from request body
    const { productName, description, price, Image, video, role, createdBy } =
      req.body;
    const Id = IDPRODUCt++;
    console.log(Id);
    console.log("Request body:", req.body);
    const validated = producrschema.validate(req.body);
    if (validated.error) {
      throw validated.error;
    }
    console.log("hellsahg");
    const newuser = await Product.create({
      productName,
      description,
      price,
      Image: req.file ? req.file.path : "",
      video,
      role,
      createdBy: createdBy,
    });

    console.log(createdBy);
    res.status(201).json({ message: "Product added successfully", newuser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
  next();
};
/////get all products here

// exports.getallProducts = async (req, res, next) => {
//   try {
//     let userProduct;
//     // Fetch products
//     const products = await Product.find().select(
//       "productName price description role Image createdBy"
//     );

//     // Populate createdBy field manually
//     for (const product of products) {
//       const user = await Users.findById(product.createdBy);

//       if (user) {
//         product.createdBy = user.userName;
//         userProduct = user.userName;
//         console.log("the user", userProduct);
//       } else {
//         product.createdBy = "Unknown"; // Handle case where user is not found
//       }
//     }

//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.getallProducts = async (req, res, next) => {
  try {
    // Fetch products and populate the createdBy field with the user's information
    const products = await Product.find().select(
      "productName price description role Image createdBy"
    );

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getallProducts = async (req, res, next) => {
//   try {
//     const products = await Product.find().select(
//       "productName price description role Image "
//     );
//     const user = await User.findById(createdBy);
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
//   next();
// };
////// get product by id
exports.getProductbyid = async (req, res, next) => {
  const iD = req.params.id;
  try {
    const product = await Product.findById(iD).select(
      "productName price description image role"
    );
    res.json(product);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  next();
};

///here delete product
exports.deleteProduct = async (req, res, next) => {
  const iD = req.params.id;
  try {
    await Product.findByIdAndDelete(iD);
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(400).json({ error: error.message });
  }
  next();
};
/////edit product here
exports.editproduct = async (req, res) => {
  const iD = req.params.id;
  const editproduct = req.body;
  editproduct.Image = req.file ? req.file.path : "";
  try {
    const validated = producrschema.validate(editproduct);

    if (validated.error) {
      throw validated.error;
    }
    await Product.findByIdAndUpdate(iD, editproduct);
    if (!editproduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json({ message: "product updated succesful " });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};
///get all users
exports.getallusers = async (req, res, next) => {
  try {
    const users = await Users.find({ role: "user" });
    res.json(users);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  next();
};

///
////// get user by id
exports.getUserbyid = async (req, res, next) => {
  const iD = req.params.id;
  try {
    const user = await Users.findById(iD);
    res.json(user);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  next();
};

///user add user
exports.adduser = async (req, res, next) => {
  try {
    const { userName, Email, Password, Age, Image, Phone, Address } = req.body;

    const validated = Userschema.validate(req.body);
    if (validated.error) {
      throw validated.error;
    }

    const emailcheck = await Users.findOne({ Email }).exec();
    if (emailcheck) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = await Users.create({
      userName,
      Email,
      Password: hashedPassword,
      Age,
      Image: req.file ? req.file.path : "",
      Phone,
      Address,
    });

    console.log("User added successfully:", newUser);
    res.status(201).json({ message: "User added successfully", newUser });

    next();
  } catch (error) {
    console.error("Error adding user:", error);
    res
      .status(500)
      .json({ message: "Error adding user", error: error.message });
  }
};
///////// delete user
exports.deleteuser = async (req, res) => {
  const iD = req.params.id;

  try {
    await Users.findByIdAndDelete(iD);
    console.log(iD);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
///// here edit user
exports.edituser = async (req, res, next) => {
  const iD = req.params.id;
  const edituser = req.body;
  edituser.Image = req.file ? req.file.path : "";
  try {
    const validated = UpdateValidation.validate(edituser);

    if (validated.error) {
      throw validated.error;
    }
    await Users.findByIdAndUpdate(iD, edituser);
    if (!edituser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user updated succesful " });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
  next();
};
////sorting
exports.sortproduct = async (req, res) => {
  try {
    const sortBy = req.params.id;
    console.log("Sorting criteria:", sortBy);
    let sortedProducts;
    if (sortBy === "productName1") {
      sortedProducts = await Product.find()
        .sort({ productName: 1 })
        .select("productName price description Image");
    } else if (sortBy === "productName-1") {
      sortedProducts = await Product.find()
        .sort({ productName: -1 })
        .select("productName price description Image");
    } else if (sortBy === "price1") {
      console.log("price1");
      sortedProducts = await Product.find()
        .sort({ price: 1 })
        .select("productName price description Image");
    } else if (sortBy === "price-1") {
      console.log("price");
      sortedProducts = await Product.find()
        .sort({ price: -1 })
        .select("productName price description Image");
    }

    res.json(sortedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sorting products", error: error.message });
  }
};
///sort user
exports.sortusers = async (req, res) => {
  try {
    const sortBy = req.params.id;
    console.log("Sorting criteria:", sortBy);
    let sortedProducts;

    if (sortBy === "userName1") {
      sortedProducts = await Users.find({ role: "user" })
        .sort({ userName: 1 })
        .select("userName Email isActive  Image");
    } else if (sortBy === "userName-1") {
      sortedProducts = await Users.find({ role: "user" })
        .sort({ userName: -1 })
        .select("userName Email  Image isActive ");
    } else if (sortBy === "Email1") {
      sortedProducts = await Users.find({ role: "user" })
        .sort({ Email: 1 })
        .select("userName Email  Image isActive ");
    } else if (sortBy === "Email-1") {
      sortedProducts = await Users.find({ role: "user" })
        .sort({ Email: -1 })
        .select("userName Email  Image isActive ");
    }

    res.json(sortedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sorting products", error: error.message });
  }
};
/// filter here to Products by ctogries

exports.filterProdducts = async (req, res) => {
  const sortBy = req.params.id;
  const category = req.params.id;
  console.log(category);
  try {
    let filteredProducts;

    if (category === "All") {
      filteredProducts = await Products.find().select(
        "productName price Image description"
      );
    } else if (
      category === "Charcoal" ||
      category === "Lnk drawing" ||
      category === "Graffit drawing" ||
      category === "Digital drawing"
    ) {
      filteredProducts = await Products.find({ role: category }).select(
        "productName price Image description"
      );
    } else {
      return res.status(400).json({ message: "Invalid category" });
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//filter users
exports.filteredUsers = async (req, res) => {
  const isActive = req.params.id;
  console.log(isActive);
  try {
    let filteredUsers;

    if (isActive === "All") {
      filteredUsers = await Users.find({ role: "user" }).select(
        "userName Email Image isActive"
      );
    } else if (isActive === "true" || isActive === "false") {
      filteredUsers = await Users.find({
        isActive: isActive,
        role: "user",
      }).select("userName Email Image isActive");
      console.log(filteredUsers);
    } else {
      return res.status(400).json({ message: "Invalid isActive" });
    }

    res.json(filteredUsers);
  } catch (error) {
    console.error("Error filtering users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
