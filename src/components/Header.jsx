import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Mail, Menu, Phone, ShoppingCart } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import myContext from "../context/myContext";

const Header = () => {
  const isLoggedIn = false;
  const user = "Suhag";

  const { cartTotalQuantity } = useContext(myContext);

  return (
    <header className="bg-gray-100 px-4 md:px-12 lg:px-28">
      {/* top header */}
      <div className="hidden md:flex justify-between text-base py-3">
        <div className="flex gap-x-12">
          <div className="flex items-center gap-x-2">
            <Phone size={16} />
            <span>+88 01866768193</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Mail size={16} />
            <span>suhagrana.q@gmail.com</span>
          </div>
        </div>

        <div className="flex gap-x-12">
          <div className="flex items-center space-x-2">
            {/* <Switch id="darkmode-toggle" size={18} /> */}
          </div>
          <div>whatsapp: +8801607010719</div>
        </div>
      </div>
      <Separator />

      {/* desktop header */}
      <div className="hidden md:flex justify-between items-center h-20">
        <div className="text-2xl font-medium">
          <Link to="/">
            <span className="text-red-400">Z</span>shop
          </Link>
        </div>
        <nav className="flex gap-x-6 text-lg">
          <Button variant="link" className="text-base p-0 h-0">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Home
            </NavLink>
          </Button>
          <Button variant="link" className="text-base p-0 h-0">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              About
            </NavLink>
          </Button>
          <Button variant="link" className="text-base p-0 h-0">
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Contact
            </NavLink>
          </Button>
        </nav>
        <div className="flex items-center space-x-8">
          {isLoggedIn ? (
            <div>
              hello, <span>{user}</span>
            </div>
          ) : (
            <div className="flex gap-x-6">
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  Login
                </NavLink>
              </Button>
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                >
                  Register
                </NavLink>
              </Button>
            </div>
          )}

          <Link to="/cart" className="flex items-center text-sm">
            <ShoppingCart size={20} />
            <span className="mt-[-26px] text-red-500">
              {" "}
              {cartTotalQuantity}{" "}
            </span>
          </Link>
        </div>
      </div>
      <Separator />

      {/* mobile header */}
      <div className="md:hidden flex justify-between py-4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <div className="flex items-center space-x-8">
            {isLoggedIn ? (
              <div>
                hello, <span>{user}</span>
              </div>
            ) : (
              <div className="flex gap-x-6">
                <Button variant="link" className="p-0 h-0">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    Login
                  </NavLink>
                </Button>
                <Button variant="link" className="p-0 h-0">
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    Register
                  </NavLink>
                </Button>
              </div>
            )}

            <Link to="/cart" className="flex items-center text-sm">
              <ShoppingCart size={16} />
              <span className="mt-[-26px] text-red-500">
                {" "}
                {cartTotalQuantity}{" "}
              </span>
            </Link>
          </div>
          <SheetContent side="left">
            <div className="text-xl font-medium my-14">
              <Link to="/">
                <span className="text-red-400">Z</span>shop
              </Link>
            </div>
            <nav className="flex flex-col gap-y-8">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "underline" : "")}
              >
                Contact
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
