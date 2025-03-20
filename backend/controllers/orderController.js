// Placing orders using COD method

async function placeOrder(req, res) {}

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
