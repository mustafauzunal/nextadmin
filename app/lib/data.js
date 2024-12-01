import { Product, User } from "./models";
import { connectToDb } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    connectToDb();
    const count = await User.find({
      username: { $regex: regex },
    }).countDocuments();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDb();
    const user = User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  try {
    connectToDb();
    const count = await Product.find({
      title: { $regex: regex },
    }).countDocuments();
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDb();
    const product = Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product!");
  }
};
