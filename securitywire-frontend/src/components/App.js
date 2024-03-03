import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Customer from "./Customer/Customer";
import CreateNewProgram from "./Customer/CreateNewProgram";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import InvitedPrograms from "./Researcher/Invitations";
import PublicPrograms from "./Researcher/PublicPrograms";
import SubmittedPrograms from "./Researcher/Submissions";
import EnrolledPrograms from "./Researcher/EnrolledPrograms";
import ProgramsApproval from "./Admin/ProgramsApproval";
import SubmissionsApproval from "./Admin/SubmissionsApproval";
import Researchers from "./Admin/Researchers";
import Customers from "./Admin/Customers";
import Scanner from "./Customer/Scanner/Scanner";
import { verify } from "../actions";
import { useDispatch } from "react-redux";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log(auth);
  //   if (!auth.isSuccess && !auth.data) {
  //     if (localStorage.getItem("token")) {
  //       dispatch(verify());
  //     }
  //   }
  // }, [auth]);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/customer/createdPrograms">
            <Customer />
          </Route>
          <Route exact path="/customer/createProgram">
            <CreateNewProgram />
          </Route>
          <Route exact path="/researcher/enrolled">
            <EnrolledPrograms />
          </Route>
          <Route exact path="/researcher/invitations">
            <InvitedPrograms />
          </Route>
          <Route exact path="/researcher/publicPrograms">
            <PublicPrograms />
          </Route>
          <Route exact path="/researcher/submissions">
            <SubmittedPrograms />
          </Route>
          <Route path="/admin/programApproval">
            <ProgramsApproval />
          </Route>
          <Route path="/admin/submissionApproval">
            <SubmissionsApproval />
          </Route>
          <Route path="/admin/researchers">
            <Researchers />
          </Route>
          <Route path="/admin/customers">
            <Customers />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/customer/autoscan">
            <Scanner />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
