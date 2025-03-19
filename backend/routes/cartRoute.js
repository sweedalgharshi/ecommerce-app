import express from "express";

import { addToCart, updateToCart, getUserCart } from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express();

cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/update", authUser, updateToCart);

export default cartRouter;
