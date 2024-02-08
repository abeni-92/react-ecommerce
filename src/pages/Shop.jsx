import { useEffect, useState } from "react";
import { fetchData } from "./Helper";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("#");
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    async function allProducts() {
      try {
        let products;
        if (category === "all") {
          products = await Promise.resolve(
            fetchData("https://fakestoreapi.com/products?limit=20")
          );
        } else {
          products = await Promise.resolve(
            fetchData(`https://fakestoreapi.com/products/category/${category}`)
          );
        }
        setProducts([...products]);
      } catch (e) {
        console.error("Error: ", e);
      }
    }

    allProducts();
  }, [category]);

  useEffect(() => {
    // Apply search filter
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchItem.toLowerCase())
    );

    // Sorting logic based on the selected option
    switch (sortOption) {
      case "A-Z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "lowest":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts([...filtered]);
  }, [sortOption, searchItem, products]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getCategories();
  }, []);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-12 bg-primary p-6 m-8 rounded-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="search.."
            className="p-1 pl-8 w-full rounded-md"
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5 absolute top-2 left-2"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>
        <div className="flex gap-4">
          <select
            name="category"
            id="category"
            className="p-1"
            onChange={handleCategory}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select name="sort" id="sort" className="p-1" onChange={handleSort}>
            <option value="#" selected>sort</option>     
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="lowest">Lowest(price)</option>
            <option value="highest">Highest(price)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 p-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-primary rounded-xl cursor-pointer shadow-md shadow-primary transition-all duration-500 ease-in-out hover:shadow-sm hover:scale-110"
          >
            <div className="">
              <img
                src={product.image}
                className="object-fit rounded-xl h-80 w-full"
              />
            </div>
            <div className="text-center text-white p-2">
              <h2>{product.title}</h2>
              <h3>$ {product.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
