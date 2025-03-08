import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";

function PlaceOrder() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* ------------LEFT SIDE------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded px-3.5 py-1.5
             w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded px-3.5 py-1.5
             w-full"
          />
        </div>
        <input
          type="email"
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          placeholder="Email address"
        />
        <input
          type="text"
          className="border border-gray-300 rounded w-full px-3.5 py-1.5"
          placeholder="Street name"
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="City"
          />
          <input
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="Zipcode"
          />
          <input
            type="text"
            className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          type="number"
          className="border border-gray-300 rounded px-3.5 py-1.5 w-full"
          placeholder="Phone Number"
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
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>

            <div className="flex items-center gap-3 border p-2 px-3">
              <p className="min-w-3.5 h-3.5 rounded-full border"></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div className="flex items-center gap-3 border p-2 px-3">
              <p className="min-w-3.5 h-3.5 border rounded-full"></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlaceOrder;
