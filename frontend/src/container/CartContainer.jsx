import { useEffect, useState } from "react";
import CartPresenter from "../presenter/CartPresenter";
import ErrorComponent from "../components/ErrorComponent";
import { toast } from "react-toastify";

const CartContainer = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  console.log("Cart loaded from localStorage:", cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(cart);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const removeFromcart = (id) => {
    const newCart = cart.filter((pro) => pro._id !== id);
    setCart(newCart);
    toast.success("Product removed from the cart");
  };

  const updateQuantity = (id, quantity) => {
    const newCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: parseInt(quantity) } : item
    );
    setCart(newCart);
  };

  const total = calculateTotal();

  if (cart.length === 0){
    const error = { message: "Please add products to your cart" };
    
    return <ErrorComponent error={error} />;
  }
  return (
    <div>
      <CartPresenter
        products={cart}
        handleRemove={removeFromcart}
        handleQuantityChange={updateQuantity}
        total={total}
      />
    </div>
  );
};

export default CartContainer;
