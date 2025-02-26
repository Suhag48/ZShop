import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import myContext from "./MyContext";

import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategory } from "../features/category/categorySlice";
import { getTotal } from "../features/cart/cartSlice";

const MyState = ({ children }) => {
  const [searchedText, setSearchedText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  }, []);

  const cart = useSelector((state) => state.cartR);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  // filtered by text
  const receivingSearchedText = (text) => {
    setSearchedText(text);
  };

  const handleTextFilter = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchedText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const { products, isLoading, isError } = useSelector(
    (state) => state.productsR
  );

  const { cartTotalAmount, cartTotalQuantity } = cart;

  const { category } = useSelector((state) => state.categoryR);

//pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const pagingProducts = products.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(products.length / itemsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const receivingSelectedCategory = (selectedCat) => {
    setSelectedCategory(selectedCat);
  };

  // filter products by category -- desktop
  const filteredByCategory = () => {
    const filtered = products.filter(
      (product) => product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  };

  // getting selected brand
  const gettingSelectedBrand = (brand) => {
    const filtered = products.filter((product) =>
      product ? product.brand === brand : products
    );
    setFilteredProducts(filtered);
  };

  const receivingMinPrice = (min) => {
    setMinPrice(min);
  };

  const receivingMaxPrice = (max) => {
    setMaxPrice(max);
  };

  // filtered by price
  const handlePriceFilter = () => {
    const filtered = products.filter(
      (product) =>
        (minPrice === "" || product.price >= minPrice) &&
        (maxPrice === "" || product.price <= maxPrice)
    );
    setFilteredProducts(filtered);
  };

  // filter products by category -- mobile
  const filterByMobileCategory = (cat) => {
    const filtered = products.filter(
      (product) =>
        product.category && product.category.toLowerCase() === cat.toLowerCase()
    );
    setFilteredProducts(filtered);
  };

  return (
    <myContext.Provider
      value={{
        products,
        isLoading,
        isError,
        category,
        cartTotalAmount,
        cartTotalQuantity,
        pagingProducts,
        numbers,
        currentPage,
        prevPage,
        changePage,
        nextPage,
        receivingSearchedText,
        handleTextFilter,
        filteredProducts,
        receivingSelectedCategory,
        filteredByCategory,
        filterByMobileCategory,
        selectedCategory,
        gettingSelectedBrand,
        receivingMinPrice,
        receivingMaxPrice,
        handlePriceFilter,
        minPrice,
        maxPrice,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default MyState;
