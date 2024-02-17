import Home1 from "/home1.jpeg";
import Home2 from "/home2.webp";
import Home3 from "/home3.webp";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { SolidCircle } from "../svgs/SolidCircle";
import { OpenCircle } from "../svgs/OpenCircle";
import { fetchData } from "./Helper";

const images = [Home1, Home2, Home3];

const Home = () => {
  const [imgIndex, setImageIndex] = useState(0);
  const isInteractingRef = useRef(false);
  const timeoutRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4"
        );
        const products = await response.json();
        setProducts(products);
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetchData(
            "https://fakestoreapi.com/products/category/electronics?limit=1"
          ),
          fetchData(
            "https://fakestoreapi.com/products/category/jewelery?limit=1"
          ),
          fetchData(
            "https://fakestoreapi.com/products/category/women's clothing?limit=1"
          ),
        ]);
        setCategories([res1, res2, res3]);
        // console.log(res1, res2, res3);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getCategories();
  }, []);

  const handleClick = useCallback((index) => {
    setImageIndex(index);
    isInteractingRef.current = true;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 2000);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isInteractingRef.current) {
        setImageIndex((index) => {
          if (index === images.length - 1) {
            return 0;
          }
          return index + 1;
        });
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section>
      <div>
        <img
          src={images[imgIndex]}
          alt="home page pic"
          className="object-cover transition-all"
        />
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <p
              key={index}
              onClick={() => handleClick(index)}
              className="cursor-pointer"
            >
              {index === imgIndex ? <SolidCircle /> : <OpenCircle />}
            </p>
          ))}
        </div>
      </div>

      <div className="py-8">
        <h2 className="text-center bg-primary p-1 mt-8 text-white font-semibold text-2xl">
          FREE RETURNS ON ALL ORDERS
        </h2>
        <div className="p-8">
          <h2 className="text-center text-3xl font-bold my-4">New Drops</h2>
          <div className="grid grid-cols-4 gap-6 py-4">
            {products.map((product) => (
              <NavLink to={`/product/${product.id}`} key={product.id}>
                {" "}
                <div className="bg-primary rounded-xl cursor-pointer shadow-md shadow-primary transition-all duration-500 ease-in-out hover:shadow-sm hover:scale-110">
                  <div className="">
                    <img
                      src={product.image}
                      className="object-fit rounded-xl h-96 w-full"
                    />
                  </div>
                  <div className="text-center text-white p-2">
                    <h2>{product.title}</h2>
                    <h3>$ {product.price}</h3>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="py-2 px-6 rounded-md text-white bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out">
              <NavLink to="/shop">View All</NavLink>
            </button>
          </div>
        </div>
      </div>

      <div className="py-6">
        <h2 className="text-center text-3xl font-bold my-4">Categories</h2>
        <div className="grid grid-cols-3 gap-6 py-6 px-10">
          {categories.map((category) => (
            <div
              key={category[0].id}
              className="bg-primary rounded-xl cursor-pointer shadow-md shadow-primary"
            >
              <div className="">
                <img
                  src={category[0].image}
                  className="object-fit rounded-xl h-96 w-full"
                />
              </div>
              <div className="">
                <h2 className="text-center text-white text-2xl p-2 font-semibold">
                  {category[0].category}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-6 text-center">
        <img src="/bottom.png" alt="" className="p-8" />
        <h2 className="text-xl font-semibold p-2">
          HELPING OUR COMMUNITY EXPLORE THEIR INNER STREET ARTIST
        </h2>
        <p>
          Our aim is to build the biggest self-sustaining community by
          empowering vari.0s artists and athletes.
        </p>
        <button className="bg-green-500 py-2 px-6 text-white rounded-lg mt-6 hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out">
          <NavLink to="/shop">Get Your Choice</NavLink>
        </button>
      </div>
    </section>
  );
};

export default Home;
