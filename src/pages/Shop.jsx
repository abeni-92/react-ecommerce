import { useEffect, useState } from "react";
import { fetchData } from "./Helper";
import { FilterRemove } from "../svgs/FilterRemove";
import { SearchIcon } from "../svgs/SearchIcon";
import { NavLink } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOption, setSortOption] = useState("#");
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (e) {
        console.error("Error: ", e);
        setLoading(false);
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

  const removeFilter = () => {
    setSearchItem("");
    setSortOption("#");
    setCategory("all");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex items-center gap-8 bg-primary p-6 m-8 rounded-lg">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="search.."
            className="p-1 pl-8 w-full rounded-md"
            onChange={handleSearch}
            value={searchItem}
          />
          <SearchIcon />
        </div>
        <FilterRemove onClick={removeFilter} />
        <div className="flex gap-4">
          <select
            name="category"
            id="category"
            className="p-1"
            onChange={handleCategory}
            value={category}
          >
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="sort"
            id="sort"
            className="p-1"
            onChange={handleSort}
            value={sortOption}
          >
            <option value="#" selected>
              sort
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="lowest">Lowest(price)</option>
            <option value="highest">Highest(price)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 p-8">
        {filteredProducts.map((product) => (
          <NavLink to={`/product/${product.id}`} key={product.id}>
            <div className="bg-primary rounded-xl cursor-pointer shadow-md shadow-primary transition-all duration-500 ease-in-out hover:shadow-sm hover:scale-110">
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
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Shop;
