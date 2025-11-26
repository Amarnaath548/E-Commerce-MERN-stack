import { useParams } from "react-router-dom";
import useFetch from "../CustomHook/UseFetch";
import SingleProductPresenter from "../presenter/SingleProductPresenter";
import ErrorComponent from "../components/ErrorComponent";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SingleProductContainer = () => {
  const { id } = useParams();
  const url = `${import.meta.env.VITE_BACKEND_URL}/products/${id}`;
  const { data: product, loading, error } = useFetch(url);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const addToCart = () => {
    const storedCart = localStorage.getItem("cart");

    const cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.find((pro) => pro._id === product._id)) {
      toast.info("Already added to the cart");
      return;
    }

    const prod = { ...product, quantity: 1 };
    cart.push(prod);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to the cart");
    console.log(JSON.parse(localStorage.getItem("cart")));
  };

  

  if (error) <ErrorComponent error={error} />;
  return (
    <div>
      <SingleProductPresenter
        product={product}
        loading={loading}
        id={id}
        addToCart={addToCart}
      />
    </div>
  );
};

export default SingleProductContainer;
