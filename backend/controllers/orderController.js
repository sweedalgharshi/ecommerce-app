import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD method
async function placeOrder(req, res) {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Order has been place so now we need to reset the cartData
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Placing orders using STRIPE method
async function placeOrderStripe(req, res) {}

// Placing orders using RAZORPAY method
async function placeOrderRazorPay(req, res) {}

// All orders data for admin panel
async function allOrders(req, res) {}

// User order data for frontend -- using this function we can display orders for a particular user on myOrder page
async function userOrder(req, res) {}

// update order status from Admin panel-- only admin can change the status
async function updateOrderStatus(req, res) {}

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrder,
  updateOrderStatus,
};
