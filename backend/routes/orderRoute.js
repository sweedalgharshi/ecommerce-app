import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express();

// ADMIN PANEL FEATURES
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// PAYMENT FEATURES -- FRONTEND
orderRouter.post("/placeorder", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorPay);

// USER FEATURE
orderRouter.post("/userorders", authUser, userOrder);

export default orderRouter;
