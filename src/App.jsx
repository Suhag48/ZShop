import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// state
import MyState from "./context/MyState";

//pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import UserList from "./pages/admin/UserList";
import Messages from "./pages/admin/Messages";
import Products from "./pages/admin/Products";
import ProtectedAdmin from "./components/ProtectedAdmin";
import ProtectedUser from "./components/ProtectedUser";
import Profile from "./pages/user/Profile";
import MyOrders from "./pages/user/MyOrders";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <MyState>
      <Router>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/productDetails" element={<ProductDetails />} /> */}
          <Route path="/single_product/:id" element={<SingleProduct />} />
          <Route
            path="/cart"
            element={
              <ProtectedUser>
                <Cart />
              </ProtectedUser>
            }
          />

          {/* <Route path="/adminDashboard" element={<Dashboard />}>
            <Route path="/user_list" element={<UserList />} />
          </Route> */}

          <Route
            path="/adminDashboard"
            element={
              <ProtectedAdmin>
                <AdminDashboard />
              </ProtectedAdmin>
            }
          >
            {/* Nested Route for admin panel */}
            <Route path="user_list" element={<UserList />} />
            <Route path="products" element={<Products />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          <Route
            path="/userDashboard"
            element={
              <ProtectedUser>
                <UserDashboard />
              </ProtectedUser>
            }
          >
            {/* nested routed for user panel */}
            <Route path="profile" element={<Profile />} />
            <Route path="my_orders" element={<MyOrders />} />
          </Route>
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;
