import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import { removeFromCart } from "../features/cart/cartSlice";
import { decreaseCart } from "../features/cart/cartSlice";
import { increaseCart } from "../features/cart/cartSlice";
import { checkOut } from "../features/cart/cartSlice";
import myContext from "../context/myContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseAuth/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [coupon, setCoupon] = useState("");

  const { cartTotalAmount, mode, user, userData } = useContext(myContext);

  const cart = useSelector((state) => state.cartR);
  const dispatch = useDispatch();

  const { cartItems, message } = cart;

  const shippingCharge = 10;

  const navigate = useNavigate()

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(increaseCart(cartItem));
  };

  const handleCheckout = (couponCode) => {
    dispatch(checkOut(couponCode));
  };

  const order = {
    user: user,
    products: cartItems,
    total: cartTotalAmount,
  };
  
  const onOrder = async () => {
    try {
      if(!userData){
        navigate("/userDashboard/profile")
        toast.warning("Add your details first!")
      }
      else if (order.products && order.products.length > 0) {
        // Loop through each product in the cart
        const productsList = order.products.map((item) => ({
          productId: item.id,
          productTitle: item.title,
          photo: item.thumbnail,
          quantity: item.cartQuantity,
          price: item.price,
        }));
  
        // Add the order to Firestore
        await addDoc(collection(db, "Orders"), {
          orderFrom: {
            name: order.user.displayName,
            email: order.user.email,
            phone: userData.phone, // You might want to collect and pass the phone and address if needed
            address: userData.address,
          },
          products: productsList, // Array of products
          totalPrice: order.total, // Total price of the order
        });
  
        toast.success("Order placed successfully!");
      } else {
        toast.error("Your cart is empty.");
      }
    } catch (error) {
      console.log("Error placing order: ", error);
      toast.error("Error placing order: " + error.message);
    }
  };
  

  return (
    <Layout>
      <section className="py-12 md:py-20 px-4 md:px-12 lg:px-28">
        <h2
          className="text-center font-semibold text-2xl"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          Shopping Cart
        </h2>
        <Card className="flex flex-col md:flex-row mx-auto justify-between md:space-x-4 lg:space-x-8 xl:space-x-10 mt-12 p-4 lg:p-8 shadow">
          <div className="flex flex-col gap-3 w-full">
            {!cartItems.length ? (
              <p>Cart is empty!</p>
            ) : (
              cartItems?.map((cartItem) => (
                <Card
                  key={cartItem.id}
                  className="py-2 flex justify-between items-center px-2 lg:px-4"
                >
                  <div className="flex items-center gap-4 md:gap-2 lg:gap-8 w-1/3">
                    <img
                      src={cartItem.thumbnail}
                      alt={cartItem.title?.slice(0, 10)}
                      className="w-auto h-14"
                    />
                    <div>
                      <p className="text-sm">{cartItem.category}</p>
                      <CardTitle className="text-sm">
                        {cartItem.title}
                      </CardTitle>
                      <button
                        onClick={() => handleRemoveFromCart(cartItem)}
                        className="text-red-500 text-sm"
                      >
                        remove
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center justify-end w-1/3">
                    <Button
                      onClick={() => handleDecreaseCart(cartItem)}
                      variant="outline"
                      className="bg-transparent border-none"
                    >
                      -
                    </Button>
                    <span>{cartItem.cartQuantity}</span>
                    <Button
                      onClick={() => handleIncreaseCart(cartItem)}
                      variant="outline"
                      className="bg-transparent border-none"
                    >
                      +
                    </Button>
                  </div>

                  <div className="flex items-center justify-end gap-1 w-1/3">
                    <span> {cartItem.cartQuantity} </span>
                    <X className="w-4 h-4" />
                    <span> {cartItem.price} </span>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* right-sidebar */}
          <Card className="p-4 mt-12 md:mt-0 md:w-1/2 lg:w-1/3">
            <CardTitle className="text-xl">Summery</CardTitle>
            <div className="flex justify-between mt-8 space-y-1">
              <p>Subtotal</p>
              <p> ${cartTotalAmount.toFixed(2)} </p>
            </div>

            <div className="flex justify-between mt-1">
              <p>Shipping</p>
              <p>$10</p>
            </div>

            <CardTitle className="flex justify-between mt-20 text-lg">
              <p>Total</p>
              <p> ${(cartTotalAmount + shippingCharge).toFixed(2)} </p>
            </CardTitle>

            <div className="w-full gap-4 px-0 pb-0 mt-20">
              <Input
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                name="coupon"
                placeholder="coupon code"
                className="focus-visible:ring-0"
              />

              <div>
                {message && (
                  <span
                    className={`italic ml-2 text-sm ${
                      message.includes("congrats!")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {message}
                  </span>
                )}
              </div>

              <Button
                onClick={() => handleCheckout(coupon)}
                variant="outline"
                className="w-full mt-4"
              >
                Checkout
              </Button>

              <Button
                onClick={onOrder}
                variant="outline"
                className="w-full mt-6"
              >
                Order Now
              </Button>
            </div>
          </Card>
        </Card>
      </section>
    </Layout>
  );
};

export default Cart;
