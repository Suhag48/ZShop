import { useEffect, useState } from "react";

// import firebase utilities from firebase firestore
import { collection, onSnapshot, query } from "firebase/firestore";

// import firebase database from firebase config file
import { db } from "../../firebaseAuth/Auth";

import { CardTitle } from "@/components/ui/card";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any errors

  // console.log(users)
  // getting registered users from firebase
  const gettingUsers = () => {
    const q = query(collection(db, "users")); // Make sure to specify the collection name ("users" in this case)

    onSnapshot(
      q,
      (querySnapshot) => {
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Use the document ID as a unique key
          ...doc.data(), // Spread other document data
        }));
        setUsers(userData);
        setLoading(false); // Set loading to false once data is fetched
      },
      (err) => {
        setError(err.message); // Handle any errors from the snapshot listener
        setLoading(false);
      }
    );
  };

  // Fetch users on component mount
  useEffect(() => {
    gettingUsers();
  }, []);

  return (
    <section className="px-6 py-8 h-[500px]">
      <CardTitle className="text-center text-lg">Registered Users</CardTitle>

      {/* Loading State */}
      {loading ? (
        <p className="text-center h-full w-full flex items-center justify-center">
          Loading...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        // Data Display
        <table className="table-auto w-full cursor-pointer overflow-x-scroll mt-8 md:mt-10">
          <thead>
            <tr className="text-sm">
              <th className="border py-2">S.No</th>
              <th className="border py-2">Name</th>
              <th className="border py-2">Email</th>
              <th className="border py-2 hidden lg:block">Uid</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-800 text-sm">
            {users.map((user, index) => {
              const { name, email, uid, id } = user;
              return (
                <tr key={id}>
                  <td className="border py-2"> {index + 1} </td>
                  <td className="border py-2"> {name} </td>
                  <td className="border py-2"> {email} </td>
                  <td className="border py-2 hidden lg:block"> {uid} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UserList;
