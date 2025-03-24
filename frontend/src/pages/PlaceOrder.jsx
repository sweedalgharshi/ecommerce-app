import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { toast } from "react-toastify";

function PlaceOrder() {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        // console.log(items); items === id
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            // console.log(itemInfo);
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API CALLS FOR COD ORDER
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/placeorder", orderData, {
            headers: { token },
          });
          console.log(response.data);

          if (response.data.success === true) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;

        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, {
            headers: { token },
          });

          console.log(responseStripe.data);
          if (responseStripe.data.success === true) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(response.data.message);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* ------------LEFT SIDE------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded px-3.5 py-1.5
             w-full"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded px-3.5 py-1.5
             w-full"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
          />
        </div>
        <input
          required
          type="email"
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          placeholder="Email address"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
        />
        <input
          required
          type="text"
          className="border border-gray-300 rounded w-full px-3.5 py-1.5"
          placeholder="Street name"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
          />
          <input
            required
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="number"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="Zipcode"
            name="zipcode"
            onChange={onChangeHandler}
            value={formData.zipcode}
          />
          <input
            required
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={formData.country}
          />
        </div>
        <input
          required
          type="number"
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          placeholder="Phone Number"
          name="phone"
          onChange={onChangeHandler}
          value={formData.phone}
        />
      </div>

      {/* ---------------------RIGHT SIDE------------------------- */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/*  ------------------------PAYMENT METHOD SELECTION-------------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default PlaceOrder;
