// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import Customer from "../Customer/Customer";
// import Admin from "../Admin/Admin";
// import Researcher from "../Researcher/Researcher";

// const Home = () => {
//   const auth = useSelector((state) => state.auth);
//   const history = useHistory();
//   const user =
//     auth &&
//     auth.data &&
//     auth.data.data &&
//     auth.data.data.user &&
//     auth.data.data.user
//       ? auth.data.data.user
//       : null;

//   // For the sake of not loggin in every time while developing
//   // UNCOMMENT
//   // useEffect(() => {
//   //   if (auth.isError || !auth.isSuccess) {
//   //     history.push("/login");
//   //     return null;
//   //   }
//   // }, [auth]);

//   if (user && user.role === "customer") {
//     return <Customer name={user.name} />;
//   }
//   if (user && user.role === "security-researcher") return <Researcher />;
//   if (user && user.role === "admin") return <Admin />;
//   return <Customer />;
// };

// export default Home;
