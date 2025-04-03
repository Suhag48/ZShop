import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Phone,
  ShoppingCart,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";

import myContext from "../context/myContext";

const Header = () => {
  const {
    cartTotalQuantity,
    toggleMode,
    mode,
    userName,
    logout,
    user,
    adminEmail,
  } = useContext(myContext);

  const [openDashboard, setOpenDashboard] = useState(false);

  return (
    <header
      className="px-4 md:px-12 lg:px-28"
      style={{
        backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
        color: mode === "dark" ? "white" : "black", // Text color based on mode
      }}
    >
      {/* top header */}
      <div className="hidden md:flex justify-between text-base py-3">
        <div className="flex gap-x-8 lg:gap-x-12">
          <div className="flex items-center gap-x-2">
            <Phone size={16} />
            <span style={{ color: mode === "dark" ? "white" : "black" }}>
              +88 01866768193
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <Mail size={16} />
            <span style={{ color: mode === "dark" ? "white" : "black" }}>
              suhagrana.q@gmail.com
            </span>
          </div>
        </div>

        <div className="flex gap-x-2 lg:gap-x-12">
          <div className="flex items-center space-x-2">
            <Switch id="darkmode-toggle" size={18} onClick={toggleMode} />
          </div>
          <div style={{ color: mode === "dark" ? "white" : "black" }}>
            whatsapp: +8801607010719
          </div>
        </div>
      </div>
      <Separator className={`${mode === "dark" ? "hidden" : ""}`} />

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
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Home
            </NavLink>
          </Button>
          <Button variant="link" className="text-base p-0 h-0">
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "underline" : "")}
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              About
            </NavLink>
          </Button>
          {user?.email !== adminEmail && (
            <Button variant="link" className="text-base p-0 h-0">
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "underline" : "")}
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                Contact
              </NavLink>
            </Button>
          )}
        </nav>
        <div className="flex items-center space-x-8">
          {userName ? (
            <div
              className="flex items-center gap-x-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              hello,
              <span
                className="font-medium cursor-pointer flex items-center"
                onClick={() => setOpenDashboard(!openDashboard)}
              >
                {userName}
                {!openDashboard ? (
                  <span>
                    <ChevronDown className="font-medium" size={14} />
                  </span>
                ) : (
                  <span>
                    <ChevronUp size={14} />
                  </span>
                )}
              </span>
              {/* Dashboard Dropdown */}
              {openDashboard && user?.email === "suhagrana.q@gmail.com" && (
                <Card className="absolute top-28 z-10 shadow-lg p-4 w-40 bg-white">
                  <ul className="flex flex-col gap-y-2 text-base">
                    <li>
                      <Link
                        to="/adminDashboard"
                        className="hover:underline flex items-center gap-x-2"
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                    </li>

                    <li className="mt-10">
                      <div
                        onClick={logout}
                        className="hover:underline flex items-center gap-x-2 cursor-pointer"
                      >
                        <LogOut size={14} /> Logout
                      </div>
                    </li>
                  </ul>
                </Card>
              )}
              {openDashboard && user?.email !== "suhagrana.q@gmail.com" && (
                <Card className="absolute top-28 z-10 shadow-lg p-4 w-40 bg-white">
                  <ul className="flex flex-col gap-y-2 text-base">
                    <li>
                      <Link
                        to="/userDashboard"
                        className="hover:underline flex items-center gap-x-2"
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                    </li>

                    <li className="mt-10">
                      <div
                        onClick={logout}
                        className="hover:underline flex items-center gap-x-2 cursor-pointer"
                      >
                        <LogOut size={14} /> Logout
                      </div>
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          ) : (
            <div className="flex gap-x-6">
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  Login
                </NavLink>
              </Button>
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  Register
                </NavLink>
              </Button>
            </div>
          )}

          {user?.email !== adminEmail && (
            <Link to="/cart" className="flex items-center text-sm">
              <ShoppingCart size={20} />
              <span className="mt-[-26px] text-red-500">
                {cartTotalQuantity}
              </span>
            </Link>
          )}
        </div>
      </div>
      <Separator className={`${mode === "dark" ? "hidden" : ""}`} />

      {/* mobile header */}
      <div className="md:hidden flex justify-between py-4">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <div className="flex items-center gap-x-6">
            {userName ? (
              <div> 

              {/* <div style={{ color: mode === "dark" ? "white" : "black" }}>
                hello, <span>{userName}</span>
              </div> */}



              <div className="flex items-center space-x-8">
          {userName ? (
            <div
              className="flex items-center gap-x-2"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              hello,
              <span
                className="font-medium cursor-pointer flex items-center"
                onClick={() => setOpenDashboard(!openDashboard)}
              >
                {userName}
                {!openDashboard ? (
                  <span>
                    <ChevronDown className="font-medium" size={14} />
                  </span>
                ) : (
                  <span>
                    <ChevronUp size={14} />
                  </span>
                )}
              </span>
              {/* Dashboard Dropdown */}
              {openDashboard && user?.email === "suhagrana.q@gmail.com" && (
                <Card className="absolute top-28 z-10 shadow-lg p-4 w-40 bg-white">
                  <ul className="flex flex-col gap-y-2 text-base">
                    <li>
                      <Link
                        to="/adminDashboard"
                        className="hover:underline flex items-center gap-x-2"
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                    </li>

                    <li className="mt-10">
                      <div
                        onClick={logout}
                        className="hover:underline flex items-center gap-x-2 cursor-pointer"
                      >
                        <LogOut size={14} /> Logout
                      </div>
                    </li>
                  </ul>
                </Card>
              )}
              {openDashboard && user?.email !== "suhagrana.q@gmail.com" && (
                <Card className="absolute top-16 z-10 shadow-lg p-4 w-40 bg-white">
                  <ul className="flex flex-col gap-y-2 text-base">
                    <li>
                      <Link
                        to="/userDashboard"
                        className="hover:underline flex items-center gap-x-2"
                      >
                        <LayoutDashboard size={14} /> Dashboard
                      </Link>
                    </li>

                    <li className="mt-10">
                      <div
                        onClick={logout}
                        className="hover:underline flex items-center gap-x-2 cursor-pointer"
                      >
                        <LogOut size={14} /> Logout
                      </div>
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          ) : (
            <div className="flex gap-x-6">
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  Login
                </NavLink>
              </Button>
              <Button variant="link" className="text-base p-0 h-0">
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  Register
                </NavLink>
              </Button>
            </div>
          )}

          {/* {user?.email !== adminEmail && (
            <Link to="/cart" className="flex items-center text-sm">
              <ShoppingCart size={20} />
              <span className="mt-[-26px] text-red-500">
                {cartTotalQuantity}
              </span>
            </Link>
          )} */}
        </div>
              </div>
              
            ) : (
              <div className="flex gap-x-4">
                <Button variant="link" className="p-0 h-0">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-sm sm:text-base ${isActive ? "underline" : ""}`
                    }
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    Login
                  </NavLink>
                </Button>

                <Button variant="link" className="p-0 h-0">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `text-sm sm:text-base ${isActive ? "underline" : ""}`
                    }
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    Register
                  </NavLink>
                </Button>
              </div>
            )}

            <Link to="/cart" className="flex items-center text-sm">
              <ShoppingCart size={16} />
              <span className="mt-[-26px] text-red-500">
                {cartTotalQuantity}
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
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "underline" : "")}
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "underline" : "")}
                style={{ color: mode === "dark" ? "white" : "black" }}
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
