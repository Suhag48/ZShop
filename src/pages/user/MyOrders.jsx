import { Card, CardTitle } from "@/components/ui/card";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseAuth/Auth";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";

const MyOrders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(myContext); // Get logged-in user

  // Retrieve orders data from Firebase based on logged-in user's email
  const retrieveOrdersData = () => {
    if (!user) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    // Query to fetch orders for the logged-in user's email
    const q = query(
      collection(db, "Orders"),
      where("orderFrom.email", "==", user.email) // Filter by user's email
    );

    // Real-time listener for orders data
    onSnapshot(
      q,
      (QuerySnapshot) => {
        const data = QuerySnapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(),
        }));
        setOrdersData(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    retrieveOrdersData(); // Fetch orders data when component mounts
  }, [user]); // Dependency array includes user to fetch data again if the user changes

  if (loading) return <div className="flex items-center justify-center h-full">Loading your orders history...</div>;
  if (error) return <div className="flex items-center justify-center h-full">Error: {error}</div>;

  return (
    <section className="px-6 py-8 h-auto flex flex-col">
      <CardTitle className="text-center text-lg">Order History</CardTitle>

      <div className="flex flex-col gap-6 justify-between my-6">
        {ordersData.length === 0 ? (
          <p className="flex items-center justify-center h-full">No orders found!</p>
        ) : (
          ordersData.map((order, index) => (
            <div key={order.id} className="w-full">
              {/* Products Table */}
              <div className="mt-6">
                <h4 className="mb-3">Order #{index+1}</h4>
                <table className="table-auto w-full border cursor-pointer text-gray-800">
                  <thead>
                    <tr className="border text-sm w-full">
                      <th className="border py-3 font-medium">P. ID</th>
                      <th className="border py-3 font-medium">Image</th>
                      <th className="border py-3 font-medium">Title</th>
                      <th className="border py-3 font-medium">Price</th>
                      <th className="border py-3 font-medium">Qty</th>
                      <th className="border py-3 font-medium">T. Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item, index) => {
                      const {
                        productId,
                        photo,
                        productTitle,
                        price,
                        quantity,
                      } = item;
                      // Calculate total price per product
                      const totalProductPrice = (price * quantity).toFixed(2);

                      return (
                        <tr
                          key={index}
                          className="border w-full text-sm text-center"
                        >
                          <td className="border py-1">{productId}</td>
                          <td className="p-1 lg:px-0 flex justify-center items-center">
                            <img
                              src={photo}
                              alt={productTitle.slice(0, 20)}
                              className="w-12 h-12"
                            />
                          </td>
                          <td className="border py-1">{productTitle}</td>
                          <td className="border py-1">${price.toFixed(2)}</td>
                          <td className="border py-1">{quantity}</td>
                          <td className="border py-1">
                            ${totalProductPrice}
                          </td>{" "}
                          {/* Use total per product */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyOrders;
