import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section id="product-details" className="flex py-20 px-20 gap-10">
      <div className="w-1/2">
        <img
          src={product.image}
          alt="product-image"
          className="object-cover h-full w-full max-h-screen"
        />
      </div>
      <div className="w-1/2 flex flex-col gap-8">
        <h5 className="font-semibold text-xl">
          {product.category.toUpperCase()}
        </h5>
        <h3 className="text-2xl font-bold">{product.title}</h3>
        <h2 className="font-semibold text-2xl">$ {product.price}</h2>
        <input
          type="number"
          defaultValue={1}
          className="p-1 rounded-md outline-none outline-slate-400 w-1/2"
        />
        <button className="my-4 text-xl w-1/2 text-white bg-green-500 rounded font-bold py-4 outline-none hover:bg-green-600 transition-all ease-in-out">
          Add to Cart
        </button>
        <h5 className="text-2xl font-semibold">Product Details</h5>
        <span className="text-xl leading-8">{product.description}</span>
      </div>
    </section>
  );
};

export default Product;
