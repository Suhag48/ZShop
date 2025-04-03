import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";

// import context api utilitize
import myContext from "../../context/myContext";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Layout from "../../components/layout/Layout";

//import react icons
// import { IoMdLogOut } from "react-icons/io";
// import { FaUser } from "react-icons/fa";
// import { FaRegMessage } from "react-icons/fa6";
// import { MdProductionQuantityLimits } from "react-icons/md";
// import { MdDashboard } from "react-icons/md";

const AdminDashboard = () => {
  const { logout } = useContext(myContext);

  // style for active link
  const activeLink = "underline";

  return (
    <Layout>
      <section className="px-4 md:px-12 lg:px-28 py-12 md:py-20 mx-auto flex flex-col md:flex-row gap-6 h-auto">
        <div className="mx-auto w-full flex flex-col items-center md:w-1/4 h-full">
          <Card className="w-full h-auto px-2 flex flex-col items-center md:items-start md:shadow-lg">
            {/* <MdDashboard className="md:hidden lg:block" /> */}
            <CardHeader className="font-medium text-lg mb-2 sm:mb-4">
              Admin Dashboard
            </CardHeader>

            <CardContent className="flex flex-col gap-y-5">
              <NavLink
                to="/adminDashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? activeLink
                    : "flex gap-2 items-center hover:underline"
                }
              >
                {/* <MdProductionQuantityLimits /> */}
                <p>Products</p>
              </NavLink>

              <NavLink
                to="/adminDashboard/user_list"
                className={({ isActive }) =>
                  isActive
                    ? activeLink
                    : "flex gap-2 items-center hover:underline"
                }
              >
                {/* <FaUser size={16} /> */}
                <p>Users</p>
              </NavLink>

              <NavLink
                to="/adminDashboard/messages"
                className={({ isActive }) =>
                  isActive
                    ? activeLink
                    : "flex gap-2 items-center hover:underline"
                }
              >
                {/* <FaRegMessage size={16} /> */}
                <p>Messages</p>
              </NavLink>

              <NavLink
                to="/adminDashboard/orders"
                className={({ isActive }) =>
                  isActive
                    ? activeLink
                    : "flex gap-2 items-center hover:underline"
                }
              >
                {/* <FaRegMessage size={16} /> */}
                <p>Orders</p>
              </NavLink>

              <div className="w-full mt-2 md:mt-36">
                <button
                  onClick={logout}
                  className="flex items-center gap-x-2 font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full overflow-y-scroll no-scrollbar h-full md:h-[500px] shadow">
          <Outlet />
        </Card>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
