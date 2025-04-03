import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { auth } from "../firebaseAuth/Auth";

import myContext from "./myContext";

import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategory } from "../features/category/categorySlice";
import { getTotal } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

import { db } from "../firebaseAuth/Auth";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

const MyState = ({ children }) => {
  const [searchedText, setSearchedText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [mode, setMode] = useState("light");
  // const [userName, setUserName] = useState("");

  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
  }, []);

  const cart = useSelector((state) => state.cartR);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  // Set the userName when the component mounts
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (user) {
  //     setUserName(user.displayName);
  //   }
  // }, []);
  const adminEmail = "suhagrana.q@gmail.com";
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const userName = user ? user.displayName : "";

  // handle dark mode
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

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
  const itemsPerPage = 45;
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

  // logout functionality
  const logout = () => {
    try {
      localStorage.clear("user");
      toast.success("Logout Successfull. \n We will miss you!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Find the user profile by email
  const userData = profileData.find((data) => data.email === user?.email);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (userData) {
        // Update existing user profile
        const userRef = doc(db, "UserData", userData.id);
        await updateDoc(userRef, {
          name: data.name,
          phone: data.phone,
          address: data.address,
        });
        toast.success("Profile updated successfully!");
      } else {
        // Add new user profile data to Firestore
        await addDoc(collection(db, "UserData"), {
          name: data.name,
          phone: data.phone,
          address: data.address,
          email: user.email, // Make sure to store the user's email as well
        });
        toast.success("Profile data updated successfully!");
      }
      // reset(); // Reset the form
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  // Retrieve user profile data from Firestore
  const gettingUsersProfileData = () => {
    const q = query(collection(db, "UserData"));
    onSnapshot(
      q,
      (QuerySnapshot) => {
        const data = QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfileData(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    gettingUsersProfileData();
  }, []);

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
        mode,
        toggleMode,
        userName,
        logout,
        user,
        adminEmail,
        loading,
        error,
        profileData,
        onSubmit,
        userData,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default MyState;
