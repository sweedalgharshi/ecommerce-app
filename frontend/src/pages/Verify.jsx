import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  async function verifyPayment() {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        {
          success,
          orderId,
        },
        { headers: { token } }
      );

      // console.log(response.data);

      if (response.data.success === true) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(
    function () {
      verifyPayment();
    },
    [token]
  );

  return <div>verify</div>;
}
export default Verify;
