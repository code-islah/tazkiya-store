import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (User)


export const createOrder = async (req, res) => {

  const {orderItems} = req.body;
  
 if(!orderItems || orderItems.length === 0) {
  return res.status(400).json({message: "No order items"});
 }
 
  let totalPrice = 0;
   
 const itemsWithDetails = await Promise.all(orderItems.map(async (item)=>{
  const product = await Product.findById(item.product);
  
  if(!product) {
  throw new Error("Item not found");
  }
  
  totalPrice += product.price * item.quantity;
  
  return {
    product: product._id,
    name: product.name,
    quantity: item.quantity,
    price: product.price
  }
 }));
 
 const order = new Order({
    user: req.user._id,
    orderItems: itemsWithDetails,totalPrice
 });
 
 const createOrder = await order.save();
 
 res.status(201).json(createOrder);  
}





// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private

export const getMyOrders = async(req, res) => {
  const orders = await Order.find({
    user: req.user._id
  }).populate("orderItems.product", "name price");
  res.json(orders);
}




// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
export const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .populate("orderItems.product", "name price");

  res.json(orders);
};


// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Admin

export const updateOrderStatus = async (req,res)=>{
  const order = await Order.findById(req.params.id);
  
  if(!order) {
  return res.status(404).json({message: "Order not  found"});
  }
  
  order.status = req.body.status || order.status;
  
  const updatedOrder = await order.save();
  
  res.json(updatedOrder);
  
}














