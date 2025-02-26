import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

import { ToastContainer } from 'react-toastify';
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

const App = () => {
  return (
    <MyState>
      <Router>
        <ToastContainer />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/productDetails" element={<ProductDetails />} /> */}
          <Route path="/single_product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;
