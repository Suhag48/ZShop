//import react utilitize
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebaseAuth/Auth";
import { collection, onSnapshot, query } from "firebase/firestore";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import context api utilitize
import myContext from "../../context/myContext";

// import firebase utilitize

const Messages = () => {
  const [messages, setMessages] = useState([]);

  // getting context api data
  // const { loadingMessage } = useContext(myContext);
  const loadingMessage = "Loading...";

  // getting user messages from firebase
  const getMessages = () => {
    const q = query(collection(db, "messages"));
    onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section>
      {messages.length ? (
        messages.map((data, index) => {
          return (
            <Card key={index} className="m-4 px-4 py-8 mb-4 text-gray-800 flex flex-col lg:flex-row justify-between">
              <div className="mb-6 lg:w-1/2">
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="font-medium">from:</span>
                  <span>{data.data.name}</span>
                </h5>
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="font-medium">mail:</span>
                  <span>{data.data.email}</span>
                </h5>
              </div>
              <div className="text-justify lg:w-1/2">
                <h5 className="mb-1 flex items-center gap-2">
                  <span className="font-medium">subject:</span>
                  <span className="font-medium italic text-gray-700">
                    {data.data.subject}
                  </span>
                </h5>
                <p>
                  <span className="font-medium mr-2">message:</span>
                  <span className="leading-7">{data.data.message}</span>
                </p>
              </div>
            </Card>
          );
        })
      ) : (
        <p className="text-gray-800 text-center my-[50%] md:my-[25%] lg:my-[20%] flex items-center justify-center">
          {loadingMessage}
        </p>
      )}
    </section>
  );
};

export default Messages;
