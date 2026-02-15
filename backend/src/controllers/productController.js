import Product from "../models/Product.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public

export const getProducts = async (req, res) =>{
  const products = await Product.find({});
  res.json(products);
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public

export const getProductById = async (req, res) =>{
  const product = await Product.findById(req.params.id);
  if(product) {
  res.json(product);
  } else {
  res.status(404);
  throw new Error("Product not found");
  }
}



// @desc    Create new product
// @route   POST /api/products
// @access  Admin


export const createProduct = async (req, res) => {
 const {name, description, price, image, category, countInStock } = req.body;
  
  const product = new Product({
  name, description, price, image, category, countInStock,
  user: req.user._id
  });
  
  const createProduct = await product.save();
  res.status(201).json(createProduct);
}


// @desc    Update product
// @route   PUT /api/products/:id
// @access  Admin

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
  Object.assign(product, req.body);
  const updatedProduct = await product.save();
  res.json(updatedProduct);
  } else {
   res.status(404);
   throw new Error("Product not found");
  }
}


// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Admin


export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if(product) {
   await product.remove();
   res.json({message: "Product removed"});
  } else {
   res.status(404);
   throw new Error("Product not found");
  }
}



























