const Product = require("../Models/Products");
const { Users } = require("../Models/Users");
const { Userschema } = require("../Utlis/user_schema_Validatiions");
exports.getallProducts = async (req, res, next) => {
  try {
    const products = await Product.find().select(
      "productName price description image"
    );
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
/////////2 features
exports.getuserbyid = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await Users.findById(userId);

    if (!user || user.role !== "user") {
      return res.status(404).json({ message: "User not found or not an user" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  next();
};
//////// edit admin profile

exports.edituserProfile = async (req, res, next) => {
  const iD = req.params.id;
  const editprofile = req.body;
  editprofile.Image = req.file.path;
  console.log(editprofile.Image);
  try {
    const validated = Userschema.validate(editprofile);

    if (validated.error) {
      throw validated.error;
    }
    const newedit = await Users.findByIdAndUpdate(iD, editprofile);
    console.log(editprofile.role);
    if (!editprofile || newedit.role !== "user") {
      return res.status(404).json({ message: "user not found or not user" });
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
exports.deleteProfile = async (req, res) => {
  const iD = req.params.id;

  try {
    await Users.findByIdAndDelete(iD);
    console.log(iD);
    res.json({ message: "you deleted your account" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//4) sort products
exports.sortproduct = async (req, res) => {
  try {
    const sortBy = req.params.id;
    console.log("Sorting criteria:", sortBy);
    let sortedProducts;
    if (sortBy === "productName1") {
      sortedProducts = await Product.find()
        .sort({ productName: 1 })
        .select("productName price description image role");
    } else if (sortBy === "productName-1") {
      sortedProducts = await Product.find()
        .sort({ productName: -1 })
        .select("productName price description image role");
    } else if (sortBy === "price1") {
      console.log("price1");
      sortedProducts = await Product.find()
        .sort({ price: 1 })
        .select("productName price description role");
    } else if (sortBy === "price-1") {
      console.log("price");
      sortedProducts = await Product.find()
        .sort({ price: -1 })
        .select("productName price description image role");
    }

    res.json(sortedProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sorting products", error: error.message });
  }
};
