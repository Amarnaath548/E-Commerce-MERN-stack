import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import { uploadMultipleImages } from "../utils/upload.js";
import User from "../model/User.js";

export const createProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const isAdmin = user.role==="admin";
  if (!isAdmin) {
    res.status(403);
    throw new Error("Only admins can create products");
  }
  const { title, price, description, category} = req.body;
  const images= await uploadMultipleImages(req)
  const product = new Product({ title, price, description, category, images });
  await product.save();
  res.status(201).json(product);
});

// export const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find().populate("category");
//   res.status(200).json(products );
// });

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const isAdmin = user.role==="admin";
  if (!isAdmin || !isAdmin.isAdmin) {
    res.status(403);
    throw new Error("Only admins can update products");
  }
  const { title, price, description, category} = req.body;
  const images= await uploadMultipleImages(req)
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { title, price, description, category, images },
    { new: true }
  );
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json({ message: "Product deleted successfully" });
});

// export const getProductsByCategory = asyncHandler(async (req, res) => {
//   const products = await Product.find({
//     category: req.params.categoryId,
//   }).populate("category");
//   res.status(200).json(products);
// });

// export const searchProducts = asyncHandler(async (req, res) => {
//   const { title } = req.query;
//   const products = await Product.find({ $or:[
//     { title: { $regex: title, $options: "i" } },
//     { description: { $regex: title, $options: "i" } }
//   ]}).populate("category");
//   res.status(200).json(products);
// });


//----Filter,Search,sort by price,category,title
export const paginateProducts = asyncHandler(async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;

  const limit = parseInt(req.query.limit) || 50;

  const title = req.query.title;

  const price = parseFloat(req.query.price);

  const priceMin = parseFloat(req.query.price_min);

  const priceMax = parseFloat(req.query.price_max);

  const categoryId = req.query.categoryId;
  const categoryFilter = categoryId ? { category: categoryId } : {};
  let priceFilter = {};

  if (!isNaN(price)) {
    
    priceFilter = { price: { $eq: price } };
  } else if (!isNaN(priceMin) || !isNaN(priceMax)) {
    priceFilter.price = {};
    if (!isNaN(priceMin)) {
      priceFilter.price.$gte = priceMin;
    }
    if (!isNaN(priceMax)) {
      priceFilter.price.$lte = priceMax;
    }
  }
  const titleFilter = title
    ? {
        $or: [
          { title: { $regex: title, $options: "i" } },
          { description: { $regex: title, $options: "i" } },
        ],
      }
    : {};

  const filter = {
    ...titleFilter,
    ...priceFilter,
    ...categoryFilter,
  };

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("category")
    .lean();
  res.status(200).json(products);
});

export const relatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  const products = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  }).populate("category");
  res.status(200).json(products);
});
