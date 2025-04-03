const ProtectedAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user.email === "suhagrana.q@gmail.com") {
    return children;
  }
};

export default ProtectedAdmin;
